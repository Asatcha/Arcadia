import { Base } from './base.model';

export interface Timetable extends Base {
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  isClosed: boolean;
}
