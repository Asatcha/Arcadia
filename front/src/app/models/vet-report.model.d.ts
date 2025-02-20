import { Base } from './base.model';
import { EmployeeVetReport } from './employee-vet-report.model';

export interface VetReport extends EmployeeVetReport {
  status: string;
  details?: string;
}
