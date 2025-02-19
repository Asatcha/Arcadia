import { BaseDto } from 'src/shared/base.dto';

export class TimetableDto extends BaseDto {
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  isClosed: boolean;
}
