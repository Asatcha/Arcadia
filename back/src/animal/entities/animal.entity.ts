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
import { FoodReport } from 'src/animal/entities/food-report.entity';
import { Habitat } from 'src/habitat/entities/habitat.entity';
import { environment } from 'src/config/environments/environment';

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

  @OneToOne(() => AnimalImage, (image) => image.animal)
  @JoinColumn()
  animalImage: AnimalImage;

  @OneToMany(() => VetReport, (vetReport) => vetReport.animal)
  vetReports: VetReport[];

  @OneToMany(() => FoodReport, (foodReport) => foodReport.animal)
  foodReports: FoodReport[];

  @ManyToOne(() => Habitat, (habitat) => habitat.animals)
  habitat: Habitat;

  get animalImageUrl(): string {
    return this.animalImage
      ? `${environment.baseUrl}/uploads/animal/${this.animalImage.fileName}`
      : null;
  }

  toJSON() {
    return {
      ...this,
      animalImageUrl: this.animalImageUrl,
    };
  }
}
