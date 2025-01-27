import { PartialType } from '@nestjs/mapped-types';
import { FoodReportDto } from './food-report.dto';

export class UpdateFoodReportDto extends PartialType(FoodReportDto) {}
