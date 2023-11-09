import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}
