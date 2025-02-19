import { BaseDto } from 'src/shared/base.dto';

export class RatingDto extends BaseDto {
  stars: number;
  name: string;
  comment: string;
  isValid: boolean;
}
