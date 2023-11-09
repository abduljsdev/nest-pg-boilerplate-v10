import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { findService } from '../utils/helpers/find.service.helper';
import { ERROR_MESSAGES } from 'src/utils/constants/messages.constants';
import { UserStatus } from './enum/status.enum';
import { UserRole } from './enum/role.enum';

@Injectable()
export class UserService {
  genericFunctions: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create({
        ...createUserDto,
      });

      return this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findAll(offset: number, limit: number) {
    try {
      return findService(
        this.userRepository,
        'findPaginate',
        {
          isDeleted: false,
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
        },
        {
          offset,
          limit,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findOne(id: number) {
    try {
      return findService(this.userRepository, 'findOne', {
        id,
        isDeleted: false,
      }).then((res) => {
        if (res) return res;
        else throw new NotFoundException(ERROR_MESSAGES.USER['013']);
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
  }

  filterUser(options: {}) {
    try {
      return this.userRepository.findOne({
        where: options,
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'password',
          'role',
          'status',
          'passExpiryTime',
          'passVerificationCode',
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
  }

  findUser(email: string) {
    try {
      return this.userRepository
        .findOne({
          where: { email, isDeleted: false },
          select: [
            'id',
            'firstName',
            'lastName',
            'email',
            'password',
            'role',
            'status',
            'passExpiryTime',
            'passVerificationCode',
          ],
        })
        .then((res) => {
          if (res) return res;
          else throw new NotFoundException(ERROR_MESSAGES.USER['002']);
        });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository
        .findOne({ where: { id, isDeleted: false } })
        .then((res) => {
          if (res)
            return this.userRepository.save({ ...res, ...updateUserDto });
          else throw new NotFoundException(ERROR_MESSAGES.USER['013']);
        });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
  }

  updateWithOptions(id: number, updateUserDto: any) {
    try {
      return this.userRepository
        .findOne({ where: { id, isDeleted: false } })
        .then((res) => {
          if (res)
            return this.userRepository.save({ ...res, ...updateUserDto });
          throw new NotFoundException(ERROR_MESSAGES.USER['013']);
        });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
  }

  remove(id: number) {
    try {
      return this.userRepository
        .findOne({ where: { id, isDeleted: false } })
        .then((res) => {
          if (res) return this.userRepository.save({ ...res, isDeleted: true });
          else throw new NotFoundException(ERROR_MESSAGES.USER['013']);
        });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.COMMON['001']);
    }
  }
}

// findPagination(paginateOptions: {}) {
//   return findService(
//     this.userRepository,
//     'findPaginate',
//     {},
//     paginateOptions,
//     [],
//   );
// }

// findCount() {
//   try {
//     return findService(this.userRepository, 'count');
//   } catch (error) {
//     throw new InternalServerErrorException();
//   }
// }

// findCountBy(options: {}) {
//   try {
//     return findService(this.userRepository, 'countBy', options);
//   } catch (error) {
//     throw new InternalServerErrorException();
//   }
// }

// findAndCount() {
//   try {
//     return findService(this.userRepository, 'findAndCount');
//   } catch (error) {
//     throw new InternalServerErrorException();
//   }
// }
// findAndCountBy(options: {}) {
//   try {
//     return findService(this.userRepository, 'findAndCountBy', options);
//   } catch (error) {
//     throw new InternalServerErrorException();
//   }
// }
// findByIds(options: []) {
//   try {
//     return findService(
//       this.userRepository,
//       'findByIds',
//       {},
//       {},
//       options,
//     ).then((res) => {
//       if (res) return res;
//       else throw new NotFoundException();
//     });
//   } catch (error) {
//     throw new InternalServerErrorException();
//   }
// }
// exist(options: {}) {
//   try {
//     return findService(this.userRepository, 'findByIds', options);
//   } catch (error) {
//     throw new InternalServerErrorException();
//   }
// }
