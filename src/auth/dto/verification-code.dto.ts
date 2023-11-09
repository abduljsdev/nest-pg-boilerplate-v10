import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerificationCodeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  passVerificationCode: string;
}
