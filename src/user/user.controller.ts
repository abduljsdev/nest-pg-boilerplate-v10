import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  HttpStatus,
  UploadedFile,
  ConflictException,
  BadRequestException,
  UseInterceptors,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import {
  checkFileType,
  comparePassword,
  enCodePassword,
} from '../utils/helpers/generic.helper';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from 'src/utils/constants/messages.constants';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserRole } from './enum/role.enum';
import { AccountStatusDto } from './dto/account-status.dto';
import { ChangePasswordMeDto } from './dto/change-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateMeProfileDto } from './dto/update-me-profile.dto';

import { FileUploadService } from 'src/shared/uploadFile.service';
import { PaginationParams } from 'src/utils/dtos/pagination.dto';
import { CheckValidId } from 'src/utils/decorators/id.decorator';

import { Roles } from 'src/utils/decorators/role.decorator';
import { RolesGuard } from 'src/utils/guards/role.guard';
import * as _ from 'lodash';
import * as mime from 'mime-types';

@ApiTags('User')
@ApiTags('User Management')
@Controller('user')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access_token')
// @UseGuards(RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const foundUser = await this.userService.filterUser({
      email: createUserDto.email,
      isDeleted: false,
    });
    if (foundUser) {
      throw new ConflictException(ERROR_MESSAGES.USER['003']);
    }
    createUserDto.password = enCodePassword(createUserDto.password);
    const createNewUser = await this.userService.create(createUserDto);
    if (createNewUser) {
      return {
        message: SUCCESS_MESSAGES.USER['006'],
        status: HttpStatus.CREATED,
      };
    }
  }

  @Get()
  @Roles(UserRole.ADMIN)
  async find(@Query() { offset, limit }: PaginationParams) {
    const userList = await this.userService.findAll(offset, limit);
    if (userList) {
      return {
        data: userList,
        status: HttpStatus.OK,
      };
    }
  }

  @Get('me')
  async findMe(@Req() req) {
    const userData = await this.userService.findOne(req.user.id);
    if (userData) {
      return {
        data: userData,
        status: HttpStatus.OK,
      };
    }
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  async findOne(@Param('id') id: string, @CheckValidId() checkId) {
    const userData = await this.userService.findOne(+id);
    if (userData) {
      return {
        data: userData,
        status: HttpStatus.OK,
      };
    }
  }

  @Patch('change-account-status')
  @Roles(UserRole.ADMIN)
  async accountStatus(@Body() accountStatusDto: AccountStatusDto) {
    const accountStatus = await this.userService.updateWithOptions(
      accountStatusDto.userId,
      accountStatusDto,
    );
    if (accountStatus) {
      return {
        message: SUCCESS_MESSAGES.USER['007'],
        status: HttpStatus.OK,
      };
    }
  }

  @Patch('change-password-me')
  async changePassword(
    @Req() req,
    @Body() changePasswordMeDto: ChangePasswordMeDto,
  ) {
    const responseData = await this.userService.findUser(req.user.email);
    if (!responseData) {
      throw new BadRequestException(ERROR_MESSAGES.USER['002']);
    }

    const matchPassword = comparePassword(
      changePasswordMeDto.oldPassword,
      responseData.password,
    );

    if (!matchPassword) {
      throw new BadRequestException(ERROR_MESSAGES.USER['004']);
    }
    changePasswordMeDto.password = enCodePassword(changePasswordMeDto.password);
    const updatePassword = await this.userService.updateWithOptions(
      req.user.id,
      changePasswordMeDto,
    );
    if (updatePassword) {
      return {
        message: SUCCESS_MESSAGES.USER['004'],
        status: HttpStatus.OK,
      };
    }
  }

  @Patch('me')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update login user data',
    type: UpdateMeProfileDto,
  })
  async updateMe(
    @Req() req,
    @Body() updateMeProfileDto: UpdateMeProfileDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(updateMeProfileDto, '2222222222222222222');

    if (_.isEmpty(updateMeProfileDto)) {
      throw new BadRequestException(ERROR_MESSAGES.COMMON['004']);
    }

    if (image) {
      const mineType = checkFileType(mime.lookup(image.originalname));
      if (!mineType)
        throw new UnsupportedMediaTypeException(ERROR_MESSAGES.COMMON['003']);
      const resultImgUrl = await this.fileUploadService.uploadToCloudinary(
        image.buffer,
        'image',
      );
      updateMeProfileDto.image = resultImgUrl.toString();
      const updateUserData = await this.userService.updateWithOptions(
        req.user.id,
        updateMeProfileDto,
      );
      if (updateUserData) {
        return {
          message: SUCCESS_MESSAGES.USER['005'],
          status: HttpStatus.OK,
        };
      }
    }

    const updateUserData = await this.userService.updateWithOptions(
      req.user.id,
      updateMeProfileDto,
    );

    if (updateUserData) {
      return {
        message: SUCCESS_MESSAGES.USER['005'],
        status: HttpStatus.OK,
      };
    }
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUserData = await this.userService.update(+id, updateUserDto);
    if (updatedUserData) {
      return {
        message: SUCCESS_MESSAGES.USER['005'],
        status: HttpStatus.OK,
      };
    }
  }

  @Delete('me')
  async removeMe(@Req() req) {
    const deletedUser = await this.userService.remove(req.user.id);
    if (deletedUser) {
      return {
        message: SUCCESS_MESSAGES.USER['008'],
        status: HttpStatus.OK,
      };
    }
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    const deletedUser = await this.userService.remove(+id);
    if (deletedUser) {
      return {
        message: SUCCESS_MESSAGES.USER['008'],
        status: HttpStatus.OK,
      };
    }
  }

  // @Get('pagination')
  // async findPagination(@Query() paginationParams: PaginationParams) {
  //   return this.userService.findPagination({
  //     offset: paginationParams.offset,
  //     limit: paginationParams.limit,
  //   });
  // }

  // @Get()
  // @UseGuards(AuthGuard('jwt'))
  // async findAll() {
  //   this.testGateway.emitNotification('event', {
  //     testData: { user: 'zeeshan', email: 'z@z.com' },
  //   });
  //   return this.userService.findAll();
  // }

  // @Get('me')
  // @UseGuards(AuthGuard('jwt'))
  // async findMe(@Req() req) {
  //   const userData = await this.userService.findMe(req.user.id);
  //   if (!userData) {
  //     throw new NotFoundException();
  //   }
  //   return userData;
  // }
  // @Get('count')
  // @UseGuards(AuthGuard('jwt'))
  // async findCount() {
  //   const userData = await this.userService.findCount();
  //   if (!userData) {
  //     throw new NotFoundException();
  //   }
  //   return userData;
  // }

  // @Get('count-by')
  // @UseGuards(AuthGuard('jwt'))
  // async findCountBy() {
  //   const userData = await this.userService.findCountBy({ role: 'ADMIN' });
  //   if (!userData) {
  //     return 0;
  //   }
  //   return userData;
  // }

  // @Get('find-and-count')
  // @UseGuards(AuthGuard('jwt'))
  // async findAndCount() {
  //   const userData = await this.userService.findAndCount();
  //   if (!userData) {
  //     return 0;
  //   }
  //   return userData;
  // }

  // @Get('find-and-count-by')
  // @UseGuards(AuthGuard('jwt'))
  // async findAndCountBy() {
  //   const userData = await this.userService.findAndCountBy({ role: 'ADMIN' });
  //   if (!userData) {
  //     return 0;
  //   }
  //   return userData;
  // }

  // @Get(':id')
  // @UseGuards(AuthGuard('jwt'))
  // async findOne(@Param('id') id: string) {
  //   const response = await this.userService.findOne(+id);
  //   if (!response) throw new NotFoundException();
  //   return response;
  // }
}
