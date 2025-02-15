import { BaseDto } from "src/shared/base.dto";

export class FoodReportDto extends BaseDto {
  food: string;
  foodWeight: number;
}
