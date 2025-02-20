import { BaseDto } from "src/shared/base.dto";

export class EmployeeVetReportDto extends BaseDto {
  date: Date;
  food: string;
  foodWeight: number;
}
