import { LoginUserDto } from './dto/login.dto';
import {
  Controller,
  UseGuards,
  Post,
  Req,
  Body,
  HttpStatus,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from '../utils/constants/messages.constants';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { enCodePassword } from '../utils/helpers/generic.helper';
import { Request } from 'express';
import { UserService } from './../user/user.service';
import { RegisterUserDto } from './dto/register.user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { VerificationCodeDto } from './dto/verification-code.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Auth')
@Controller('auth')
@ApiTags('Auth Management')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body: LoginUserDto, @Req() req: Request) {
    const userToken = await this.authService.login(req.user);
    if (userToken) {
      return {
        data: userToken,
        message: SUCCESS_MESSAGES.USER['001'],
        status: HttpStatus.OK,
      };
    }
  }

  @Post('register')
  async create(@Body() registerUserDto: RegisterUserDto) {
    const foundUserData = await this.userService.filterUser({
      email: registerUserDto.email,
    });
    if (foundUserData) {
      throw new ConflictException(ERROR_MESSAGES.USER['003']);
    }
    registerUserDto.password = enCodePassword(registerUserDto.password);
    const registerNewUser = await this.userService.create(registerUserDto);
    if (registerNewUser) {
      return {
        message: SUCCESS_MESSAGES.USER['006'],
        status: HttpStatus.OK,
      };
    }
  }

  @Post('forget-password')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    const forgetPasswordResult = await this.authService.forgetPassword(
      forgetPasswordDto.email,
    );
    if (forgetPasswordResult) {
      return {
        message: SUCCESS_MESSAGES.USER['002'],
        status: HttpStatus.OK,
      };
    }
  }

  @Post('otp-verification')
  async forgetPasswordVerificationCode(
    @Body() verificationCodeDto: VerificationCodeDto,
  ) {
    const otpVerification =
      await this.authService.forgetPasswordVerificationCode(
        verificationCodeDto,
      );
    if (otpVerification) {
      return {
        message: SUCCESS_MESSAGES.USER['003'],
        status: HttpStatus.OK,
      };
    }
  }

  @Post('update-password')
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    const userData = await this.userService.findUser(updatePasswordDto.email);

    if (!userData) {
      throw new NotFoundException(ERROR_MESSAGES.USER['002']);
    }
    if (
      userData.passExpiryTime === null ||
      userData.passVerificationCode === null
    ) {
      throw new UnauthorizedException(ERROR_MESSAGES.USER['011']);
    }
    updatePasswordDto.password = enCodePassword(updatePasswordDto.password);
    const responseData = await this.userService.updateWithOptions(userData.id, {
      password: updatePasswordDto.password,
      passVerificationCode: null,
      passExpiryTime: null,
    });

    if (!responseData) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
    return {
      message: SUCCESS_MESSAGES.USER['004'],
      status: HttpStatus.OK,
    };
  }
}
