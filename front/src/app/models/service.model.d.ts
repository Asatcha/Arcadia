import { Base } from './base.model';

export interface Service extends Base {
  name: string;
  description: string;
  serviceImage?: File;
  serviceImageId?: number;
  serviceImageUrl?: string;
}
