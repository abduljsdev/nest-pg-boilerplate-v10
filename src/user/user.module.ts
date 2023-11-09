import { Module, Global } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TestGateway } from '../sockets/test.gateway';
import { SharedModule } from 'src/shared/shared.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedModule],
  controllers: [UserController],
  providers: [UserService, TestGateway],
  exports: [UserService],
})
export class UserModule {}
