import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateMeProfileDto {
  @ApiProperty({ required: false })
  @Transform((value) => value.value.trim())
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: false })
  @Transform((value) => value.value.trim())
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  image: string;
}

//custom decorator for multipart form data optional field is not empty
//first import 'IsNotEmptyIfProvided' decorator with ctrl + space and then use it.
//implementation example

// @ApiProperty({ required: false })
// @IsOptional()
// @IsNotEmptyIfProvided({'message':'First name should not be empty'})
// firstName: string;
