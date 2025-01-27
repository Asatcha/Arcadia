import { IsDate, IsNotEmpty, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Breed } from './breed.entity';
import { AnimalImage } from './animal-image.entity';
import { VetReport } from 'src/vet/entities/vet-report.entity';
import { FoodReport } from 'src/employee/entities/food-report.entity';

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

  @OneToMany(() => VetReport, (vetReport) => vetReport.animal)
  vetReports: VetReport[];

  @OneToMany(() => FoodReport, (foodReport) => foodReport.animal)
  foodReports: FoodReport[];
}
