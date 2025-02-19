import { Base } from './base.model';

export interface FoodReport extends Base {
  date: Date;
  food: string;
  foodWeight: number;
  animalId: number;
}
