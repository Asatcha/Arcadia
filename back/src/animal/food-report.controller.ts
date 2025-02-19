import { Body, Controller, Get, Post } from '@nestjs/common';
import { FoodReportService } from './food-report.service';
import { CreateFoodReportDto } from './dtos/create-food-report.dto';

@Controller('food-report')
export class FoodReportController {
  constructor(private readonly foodReportService: FoodReportService) {}

  // localhost:3000/food-report
  @Post()
  createFoodReport(@Body() createFoodReportDto: CreateFoodReportDto) {
    return this.foodReportService.create(createFoodReportDto);
  }

  // localhost:3000/food-report
  @Get()
  findAllFoodReports() {
    return this.foodReportService.findAll();
  }
}
