import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodReportDto } from './dtos/create-food-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodReport } from './entities/food-report.entity';
import { Repository } from 'typeorm';
import { UpdateFoodReportDto } from './dtos/update-food-report.dto';
import { Animal } from 'src/animal/entities/animal.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(FoodReport)
    private readonly foodReportRepo: Repository<FoodReport>,
    @InjectRepository(Animal)
    private readonly animalRepo: Repository<Animal>,
  ) {}

  async create(createFoodReportDto: CreateFoodReportDto) {
    const { food, foodWeight } = createFoodReportDto;
    const today = new Date();

    const newFoodReport = this.foodReportRepo.create({
      food,
      foodWeight,
      date: today,
    });

    await this.foodReportRepo.save(newFoodReport);

    return {
      message: 'Rapport alimentaire créé.',
      FoodReport: newFoodReport,
    };
  }

  async findAllByAnimal(id: number) {
    const animal = await this.animalRepo.findOneBy({ id });
    const foodReports = await this.foodReportRepo.findBy({ animal });

    return {
      foodReports: foodReports,
    };
  }

  async update(id: number, updateFoodReportDto: UpdateFoodReportDto) {
    const foodReport = await this.foodReportRepo.findOneBy({ id });

    if (!foodReport) {
      throw new NotFoundException(
        `Rapport alimentaire pour ${foodReport.animal.name} non trouvé.`,
      );
    }

    const updatedFoodReport = { ...foodReport, ...updateFoodReportDto };

    await this.foodReportRepo.save(updatedFoodReport);

    return {
      message: 'Rapport alimentaire modifié.',
      vetReport: updatedFoodReport,
    };
  }
}
