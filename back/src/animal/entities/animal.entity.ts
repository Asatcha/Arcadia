import { IsDate, IsNotEmpty, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Breed } from './breed.entity';
import { AnimalImage } from './animal-image.entity';

@Entity()
@Unique(['name'])
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @MaxLength(1000)
  @IsNotEmpty()
  status: string;

  @Column()
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;

  @ManyToOne(() => Breed, (breed) => breed.animals)
  breed: Breed;

  @OneToOne(() => AnimalImage, (image) => image.animal, { cascade: true })
  @JoinColumn()
  animalImage: AnimalImage;
}
