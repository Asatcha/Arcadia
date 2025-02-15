import { FoodReport } from 'src/employee/entities/food-report.entity';
import { VetReport } from 'src/vet/entities/vet-report.entity';
import { Breed } from '../entities/breed.entity';
import { Habitat } from 'src/habitat/entities/habitat.entity';

export class AnimalDto {
  name: string;
  birthDate: Date;
  breed: Breed;
  breedId: number;
  habitat: Habitat;
  habitatId: number;
  animalImage?: File;
  animalImageUrl?: string;
  vetReports: VetReport[];
  foodReports: FoodReport[];
}
