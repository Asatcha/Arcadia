import { EmployeeVetReportDto } from "./employee-vet-report.dto";

export class VetReportDto extends EmployeeVetReportDto {
  status: string;
  details?: string;
}
