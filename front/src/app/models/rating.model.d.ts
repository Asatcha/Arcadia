import { Base } from './base.model';

export interface Rating extends Base {
  stars: number;
  name: string;
  comment: string;
  isValid: boolean;
}
