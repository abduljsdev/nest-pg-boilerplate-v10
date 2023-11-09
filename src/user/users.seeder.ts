import { Injectable } from '@nestjs/common';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async seed(): Promise<any> {
    const user = DataFactory.createForClass(User).generate(1);
    return this.userRepository.save(user);
  }

  async drop(): Promise<any> {
    return this.userRepository.clear();
  }
}
