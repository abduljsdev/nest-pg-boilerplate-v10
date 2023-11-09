import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { User } from '../user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminSeeder } from 'src/user/seeder/admin.seeder';
import configuration from '../utils/config/configuration';

seeder({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.main.host'),
        port: configService.get('database.main.port'),
        username: configService.get('database.main.username'),
        password: configService.get('database.main.password'),
        database: configService.get('database.main.database'),
        entities: ['dist/**/*.entity.js'],
        logging: true,
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([User]),
  ],
  providers: [AdminSeeder],
}).run([AdminSeeder]);
