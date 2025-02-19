import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { Role } from 'src/auth/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  stars: number;

  @Column()
  @MaxLength(20)
  @IsNotEmpty()
  name: string;

  @Column()
  @MaxLength(300)
  @IsNotEmpty()
  comment: string;

  @Column({ default: false })
  @IsNotEmpty()
  isValid: boolean;
}
