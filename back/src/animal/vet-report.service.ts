import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateVetReportDto } from './dtos/create-vet-report.dto';
import { VetReport } from './entities/vet-report.entity';
import { CreateEmployeeVetReportDto } from './dtos/create-food-report.dto';
import { UpdateVetReportDto } from './dtos/update-animal.dto copy';

@Injectable()
export class VetReportService {
  constructor(
    @InjectRepository(VetReport)
    private vetReportRepo: Repository<VetReport>,
    @InjectRepository(Animal)
    private animalRepo: Repository<Animal>,
  ) {}

  async createByVet(createVetReportDto: CreateVetReportDto) {
    const { date, food, foodWeight, status, details, animalId } =
      createVetReportDto;

    const foundVetReport = await this.vetReportRepo.findOneBy({ date });

    if (foundVetReport) {
      throw new InternalServerErrorException(
        'Rapport vétérinaire déjà existant.',
      );
    }

    const newVetReport = this.vetReportRepo.save({
      date,
      food,
      foodWeight,
      status,
      details,
      animal: await this.animalRepo.findOneBy({ id: animalId }),
    });

    return newVetReport;
  }

  async createByEmployee(
    createEmployeeVetReportDto: CreateEmployeeVetReportDto,
  ) {
    const { date, food, foodWeight, animalId } = createEmployeeVetReportDto;

    const foundvetReport = await this.vetReportRepo.findOneBy({ date });

    if (foundvetReport) {
      throw new InternalServerErrorException(
        'Rapport vétérinaire déjà existant.',
      );
    }

    const newVetReport = this.vetReportRepo.save({
      date,
      food,
      foodWeight,
      animal: await this.animalRepo.findOneBy({ id: animalId }),
    });

    return newVetReport;
  }

  async findAll() {
    const vetReports = await this.vetReportRepo.find();

    return vetReports;
  }

  async updateByVet(id: number, updateVetReportDto: UpdateVetReportDto) {
    const foundVetReport = await this.vetReportRepo.findOneBy({ id });

    if (!foundVetReport) {
      throw new NotFoundException(
        `Rapport vétérinaire avec l'id ${id} non trouvé.`,
      );
    }

    const updatedVetReport = { ...foundVetReport, ...updateVetReportDto };

    await this.vetReportRepo.save(updatedVetReport);

    return updatedVetReport;
  }
}
