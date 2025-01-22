import { IsNotEmpty, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Habitat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @MaxLength(1000)
  @IsNotEmpty()
  comments: string;
}
