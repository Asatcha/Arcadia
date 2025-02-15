import { BaseDto } from "src/shared/base.dto";

export class VetReportDto extends BaseDto {
  food: string;
  foodWeight: number;
  status: string;
}
