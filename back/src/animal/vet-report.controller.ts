import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VetReportService } from './vet-report.service';
import { CreateVetReportDto } from './dtos/create-vet-report.dto';
import { CreateEmployeeVetReportDto } from './dtos/create-food-report.dto';
import { UpdateVetReportDto } from './dtos/update-animal.dto copy';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role, Roles } from 'src/auth/roles.decorator';

@Controller('vet-report')
export class VetReportController {
  constructor(private readonly vetReportService: VetReportService) {}

  // localhost:3000/vet-report/vet
  @Post('vet')
  @UseGuards(RolesGuard)
  @Roles(Role.Vet)
  createVetReportByVet(@Body() createVetReportDto: CreateVetReportDto) {
    return this.vetReportService.createByVet(createVetReportDto);
  }

  // localhost:3000/vet-report/employee
  @Post('employee')
  @UseGuards(RolesGuard)
  @Roles(Role.Employee)
  createVetReportByEmployee(
    @Body() createEmployeeVetReportDto: CreateEmployeeVetReportDto,
  ) {
    return this.vetReportService.createByEmployee(createEmployeeVetReportDto);
  }

  // localhost:3000/vet-report
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Employee, Role.Vet)
  findAllVetReports() {
    return this.vetReportService.findAll();
  }

  // localhost:3000/vet-report/:id
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Vet)
  update(
    @Param('id') id: string,
    @Body() updateVetReportDto: UpdateVetReportDto,
  ) {
    return this.vetReportService.updateByVet(+id, updateVetReportDto);
  }
}
