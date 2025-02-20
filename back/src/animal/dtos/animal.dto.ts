import { Breed } from '../entities/breed.entity';
import { Habitat } from 'src/habitat/entities/habitat.entity';
import { BaseDto } from 'src/shared/base.dto';
import { VetReport } from '../entities/vet-report.entity';

export class AnimalDto extends BaseDto {
  name: string;
  birthDate: Date;
  breed: Breed;
  breedId: number;
  habitat: Habitat;
  habitatId: number;
  animalImage?: File;
  animalImageUrl?: string;
  latestVetReport: VetReport;
  vetReports: VetReport[];
}
