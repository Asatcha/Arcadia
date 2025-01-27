import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateFoodReportDto } from './dtos/create-food-report.dto';
import { UpdateFoodReportDto } from './dtos/update-food-report.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // localhost:3000/employee
  @Post()
  create(@Body() createFoodReportDto: CreateFoodReportDto) {
    return this.employeeService.create(createFoodReportDto);
  }

  // localhost:3000/amployee/animal/:id
  @Get('animal/:id')
  findAllByAnimal(@Param('id') id: string) {
    return this.employeeService.findAllByAnimal(+id);
  }

  // localhost:3000/employee/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFoodReportDto: UpdateFoodReportDto,
  ) {
    return this.employeeService.update(+id, updateFoodReportDto);
  }
}
