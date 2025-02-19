import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodReport } from './entities/food-report.entity';
import { CreateFoodReportDto } from './dtos/create-food-report.dto';
import { Animal } from './entities/animal.entity';

@Injectable()
export class FoodReportService {
  constructor(
    @InjectRepository(FoodReport)
    private foodReportRepo: Repository<FoodReport>,
    @InjectRepository(Animal)
    private animalRepo: Repository<Animal>,
  ) {}

  async create(createFoodReportDto: CreateFoodReportDto) {
    const { date, food, foodWeight, animalId } = createFoodReportDto;

    const foundFoodReport = await this.foodReportRepo.findOneBy({ date });

    if (foundFoodReport) {
      throw new InternalServerErrorException(
        'Rapport alimentaire déjà existant.',
      );
    }

    const newFoodReport = this.foodReportRepo.save({
      date,
      food,
      foodWeight,
      animal: await this.animalRepo.findOneBy({ id: animalId }),
    });

    return newFoodReport;
  }

  async findAll() {
    const foodReports = await this.foodReportRepo.find();

    return foodReports;
  }
}
