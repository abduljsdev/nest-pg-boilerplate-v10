import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../enum/role.enum';
export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
