import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordMeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}

export class ChangePasswordUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}
