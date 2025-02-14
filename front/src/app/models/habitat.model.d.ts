import { Base } from './base.model';

export interface Habitat extends Base {
  name: string;
  description: string;
  comments?: string;
  habitatImage?: File;
  habitatImageId?: number;
  habitatImageUrl?: string;
}
