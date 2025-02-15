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
import { Habitat } from 'src/habitat/entities/habitat.entity';

@Entity()
@Unique(['name'])
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(20)
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;

  @ManyToOne(() => Breed, (breed) => breed.animals)
  breed: Breed;

  // TODO: handle cascade delete
  @OneToOne(() => AnimalImage, (image) => image.animal, { cascade: true, onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn()
  animalImage: AnimalImage;

  @OneToMany(() => VetReport, (vetReport) => vetReport.animal)
  vetReports: VetReport[];

  @OneToMany(() => FoodReport, (foodReport) => foodReport.animal)
  foodReports: FoodReport[];

  @ManyToOne(() => Habitat, (habitat) => habitat.animals)
  habitat: Habitat;
}
