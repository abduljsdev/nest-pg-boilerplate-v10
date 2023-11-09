import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { UserStatus } from '../enum/status.enum';
import { UserRole } from '../enum/role.enum';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ nullable: true, select: false })
  passVerificationCode: string;

  @Column({ nullable: true, select: false })
  passExpiryTime: string;

  @Column({ default: false, select: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
