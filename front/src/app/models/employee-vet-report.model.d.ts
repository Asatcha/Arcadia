import { Base } from './base.model';

export interface EmployeeVetReport extends Base {
  date: Date;
  food: string;
  foodWeight: number;
  animalId: number;
}
