import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodReport } from './entities/food-report.entity';
import { Animal } from 'src/animal/entities/animal.entity';


@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [TypeOrmModule.forFeature([FoodReport, Animal])],
})
export class EmployeeModule {}
