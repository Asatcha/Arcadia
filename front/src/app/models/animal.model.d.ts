import { Base } from './base.model';
import { Habitat } from './habitat.model';

export interface Animal extends Base {
  name: string;
  status: string;
  birthDate: Date;
  animalImage: AnimalImage;
  animalImageId: number;
  animalImageUrl: string;
  breed: Breed;
  breedId: number;
  habitat: Habitat;
  habitatId: number;
  vetReports: VetReport[];
  foodReports: FoodReport[];
}
