import { BaseDto } from "src/shared/base.dto";

export class FoodReportDto extends BaseDto {
  date: Date;
  food: string;
  foodWeight: number;
}
