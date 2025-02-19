import { BaseDto } from 'src/shared/base.dto';
export class ServiceDto extends BaseDto {
  name: string;
  description: string;
  serviceImage: File;
  serviceImageUrl?: string;
}
