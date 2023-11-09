import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
