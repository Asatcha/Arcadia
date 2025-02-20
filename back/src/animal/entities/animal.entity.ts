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
import { Habitat } from 'src/habitat/entities/habitat.entity';
import { environment } from 'src/config/environments/environment';
import { VetReport } from './vet-report.entity';

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

  @ManyToOne(() => Habitat, (habitat) => habitat.animals)
  habitat: Habitat;

  get animalImageUrl(): string {
    return this.animalImage
      ? `${environment.baseUrl}/uploads/animal/${this.animalImage.fileName}`
      : null;
  }

  get latestVetReport(): VetReport | null {
    return this.vetReports?.length
      ? this.vetReports.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )[0]
      : null;
  }

  toJSON() {
    return {
      ...this,
      animalImageUrl: this.animalImageUrl,
      latestVetReport: this.latestVetReport,
    };
  }
}
