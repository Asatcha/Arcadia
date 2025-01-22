import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VetReport } from './entities/vet-report.entity';
import { Repository } from 'typeorm';
import { CreateVetReportDto } from './dtos/create-vet-report.dto';
import { UpdateVetReportDto } from './dtos/update-vet-report.dto';
import { Habitat } from 'src/habitat/entities/habitat.entity';
import { UpdateHabitatCommentsDto } from './dtos/update-habitat-comments.dto copy';

@Injectable()
export class VetService {
  constructor(
    @InjectRepository(VetReport)
    private readonly vetReportRepo: Repository<VetReport>,
    @InjectRepository(Habitat)
    private readonly habitatRepo: Repository<Habitat>,
  ) {}

  async create(createVetReportDto: CreateVetReportDto) {
    const { food, foodWeight, details } = createVetReportDto;
    const today = new Date();

    const newVetReport = this.vetReportRepo.create({
      food,
      foodWeight,
      details,
      date: today,
    });

    await this.vetReportRepo.save(newVetReport);

    return {
      message: 'Rapport vétérinaire créé.',
      VetReport: newVetReport,
    };
  }

  async findAllByAnimal() {
    const vetReports = await this.vetReportRepo.find();

    return {
      vetReports: vetReports,
    };
  }

  async update(id: number, updateVetReportDto: UpdateVetReportDto) {
    const vetReport = await this.vetReportRepo.findOneBy({ id });

    if (!vetReport) {
      throw new NotFoundException(
        `Rapport vétérinaire pour ${vetReport.animal.name} non trouvé.`,
      );
    }

    const updatedVetReport = { ...vetReport, ...updateVetReportDto };

    await this.vetReportRepo.save(updatedVetReport);

    return {
      message: 'Rapport vétérinaire modifié.',
      vetReport: updatedVetReport,
    };
  }

  async updateHabitat(id: number, updateHabitatCommentsDto: UpdateHabitatCommentsDto) {
    const habitat = await this.habitatRepo.findOneBy({ id });

    if (!habitat) {
      throw new NotFoundException(
        `Habitat ${habitat.name} non trouvé.`,
      );
    }

    const updatedHabitat = { ...habitat, ...updateHabitatCommentsDto };

    await this.habitatRepo.save(updatedHabitat);

    return {
      message: 'Commentaires de l\'habitat modifiés.',
      habitat: updatedHabitat,
    };
  }
}
