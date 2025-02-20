import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { VetReportService } from './vet-report.service';
import { CreateVetReportDto } from './dtos/create-vet-report.dto';
import { CreateEmployeeVetReportDto } from './dtos/create-food-report.dto';
import { UpdateVetReportDto } from './dtos/update-animal.dto copy';

@Controller('vet-report')
export class VetReportController {
  constructor(private readonly vetReportService: VetReportService) {}

  // localhost:3000/vet-report/vet
  @Post('vet')
  createVetReportByVet(@Body() createVetReportDto: CreateVetReportDto) {
    return this.vetReportService.createByVet(createVetReportDto);
  }

  // localhost:3000/vet-report/employee
  @Post('employee')
  createVetReportByEmployee(
    @Body() createEmployeeVetReportDto: CreateEmployeeVetReportDto,
  ) {
    return this.vetReportService.createByEmployee(createEmployeeVetReportDto);
  }

  // localhost:3000/vet-report
  @Get()
  findAllVetReports() {
    return this.vetReportService.findAll();
  }

  // localhost:3000/vet-report/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVetReportDto: UpdateVetReportDto) {
    return this.vetReportService.updateByVet(+id, updateVetReportDto);
  }
}
