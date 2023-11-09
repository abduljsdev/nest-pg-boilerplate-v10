import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../enum/status.enum';

export class AccountStatusDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  userId: number;

  @ApiProperty({ required: true })
  @IsEnum(UserStatus)
  status: UserStatus;
}
