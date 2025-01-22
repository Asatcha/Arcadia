import { PartialType } from '@nestjs/mapped-types';
import { VetReportDto } from './vet-report.dto';

export class UpdateVetReportDto extends PartialType(VetReportDto) {}
