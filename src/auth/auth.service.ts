import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { comparePassword } from '../utils/helpers/generic.helper';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../user/enum/role.enum';
import { ERROR_MESSAGES } from 'src/utils/constants/messages.constants';
import { verificationCodeEmailTemplate } from 'src/utils/constants/email-template';
import { EmailService } from 'src/shared/email.service';
import { VerificationCodeDto } from './dto/verification-code.dto';
import { UserStatus } from 'src/user/enum/status.enum';
import handlebars from 'handlebars';
import * as randomize from 'randomatic';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    pass: string,
    role: UserRole,
  ): Promise<any> {
    const user = await this.userService.filterUser({
      email: email,
      isDeleted: false,
    });
    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.USER['002']);
    }
    if (user.status === UserStatus.INACTIVE) {
      throw new UnauthorizedException(ERROR_MESSAGES.USER['014']);
    }
    if (user) {
      const matchPassword = comparePassword(pass, user.password);
      if (matchPassword) {
        delete user.password;
        return user;
      }

      throw new UnauthorizedException(ERROR_MESSAGES.USER['004']);
    }
  }
  async login(payload: any) {
    return {
      access_token: this.jwtService.sign({ ...payload }),
    };
  }

  async forgetPassword(email: string) {
    const userData = await this.userService.filterUser({
      email: email,
      isDeleted: false,
    });
    if (!userData) {
      throw new NotFoundException(ERROR_MESSAGES.USER['002']);
    }
    if (userData.status === UserStatus.INACTIVE) {
      throw new UnauthorizedException(ERROR_MESSAGES.USER['014']);
    }
    const verCode = randomize('0', 4);
    const template = handlebars.compile(verificationCodeEmailTemplate);
    const userId = userData.id;
    const expiryTime = moment().utc().add(2, 'hours').format();
    const replacements = {
      verificationCode: verCode,
      expireTime: expiryTime,
    };
    const htmlToSend = template(replacements);
    this.emailService.sendMail([email], htmlToSend, 'Forget password (OTP)');
    const responseData = await this.userService.updateWithOptions(userId, {
      passVerificationCode: verCode,
      passExpiryTime: expiryTime,
    });
    if (!responseData) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
    return true;
  }

  async forgetPasswordVerificationCode(
    verificationCodeDto: VerificationCodeDto,
  ) {
    const userData = await this.userService.findUser(verificationCodeDto.email);
    if (!userData) {
      throw new NotFoundException(ERROR_MESSAGES.USER['002']);
    }
    const verifyCode = _.isEqual(
      userData.passVerificationCode,
      verificationCodeDto.passVerificationCode,
    );

    const dateTimeCheck = moment(userData.passExpiryTime).isAfter(
      moment().utc().format(),
      'seconds',
    );

    if (!dateTimeCheck || !verifyCode) {
      throw new UnauthorizedException(ERROR_MESSAGES.USER['011']);
    }
    return true;
  }
}
