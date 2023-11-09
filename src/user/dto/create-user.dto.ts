import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;

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
