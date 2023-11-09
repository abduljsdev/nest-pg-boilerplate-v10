import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { enCodePassword } from 'src/utils/helpers/generic.helper';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async seed(): Promise<any> {
    const userSeedData = {
      firstName: this.configService.get('seed.user.firstName'),
      lastName: this.configService.get('seed.user.lastName'),
      email: this.configService.get('seed.user.email'),
      password: enCodePassword(this.configService.get('seed.user.password')),
      role: this.configService.get('seed.user.role'),
    };
    const userData = this.userRepository.create(userSeedData);
    await this.userRepository.save(userData);
  }

  async drop(): Promise<any> {
    return this.userRepository.clear();
  }
}
