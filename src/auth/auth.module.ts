import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../user/entities/user.entity';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    SharedModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: configService.get('jwt.expiry') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
