import { Base } from './base.model';

export interface Animal extends Base {
  name: string;
  status: string;
  birthDate: Date;
  animalImage: AnimalImage;
  animalImageId: number;
  breed: Breed;
  breedId: number;
  vetReport: VetReport[];
  foodReport: FoodReport[];
}
