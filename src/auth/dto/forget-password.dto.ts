import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ForgetPasswordDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
