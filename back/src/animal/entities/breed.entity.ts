import { IsNotEmpty, MaxLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Animal } from './animal.entity';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(30)
  @IsNotEmpty()
  breed: string;

  @OneToMany(() => Animal, (animal) => animal.breed)
  animals: Animal[];
}
