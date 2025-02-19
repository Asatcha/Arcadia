import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServiceDto } from './dtos/create-service.dto';
import { ServiceImage } from './entities/service-image.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { existsSync, unlinkSync } from 'fs';
import { UPLOADS_FOLDER } from 'src/config/multer.config';
import { join } from 'path';
import { UpdateServiceDto } from './dtos/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
    @InjectRepository(ServiceImage)
    private serviceImageRepo: Repository<ServiceImage>,
  ) {}

  async create(createServiceDto: CreateServiceDto, file: Express.Multer.File) {
    const { name, description } = createServiceDto;

    const foundService = await this.serviceRepo.findOneBy({ name });

    if (foundService) {
      throw new InternalServerErrorException('Service déjà existant.');
    }

    const newService = this.serviceRepo.create({ name, description });

    if (file) {
      const createdServiceImage = new ServiceImage();
      createdServiceImage.fileName = file.filename;
      createdServiceImage.service = newService;

      await this.serviceImageRepo.save(createdServiceImage);
      newService.serviceImage = createdServiceImage;
      await this.serviceRepo.save(newService);
    }

    return plainToInstance(Service, newService);
  }

  async findAll() {
    const services = await this.serviceRepo.find({
      relations: ['serviceImage'],
    });

    return services;
  }

  async findOneById(id: number) {
    const foundService = await this.serviceRepo.findOne({
      where: { id },
      relations: ['serviceImage'],
    });

    return foundService;
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
    file?: Express.Multer.File,
  ) {
    const service = await this.serviceRepo.findOne({
      where: { id },
      relations: ['serviceImage'],
    });

    if (!service) {
      throw new NotFoundException('Service non trouvé');
    }

    service.name = updateServiceDto.name ?? service.name;
    service.description = updateServiceDto.description ?? service.description;

    if (file) {
      if (service.serviceImage) {
        const oldFilePath = join(
          UPLOADS_FOLDER,
          'service',
          service.serviceImage.fileName,
        );
        if (existsSync(oldFilePath)) {
          try {
            unlinkSync(oldFilePath);
          } catch (error) {
            console.error(
              "Erreur lors de la suppression de l'ancienne image :",
              error,
            );
          }
        }
      }

      const newServiceImage = new ServiceImage();
      newServiceImage.fileName = file.filename;
      newServiceImage.service = service;

      await this.serviceImageRepo.save(newServiceImage);

      service.serviceImage = newServiceImage;
    }

    await this.serviceRepo.save(service);

    return plainToInstance(Service, service);
  }

  async delete(id: number): Promise<Service> {
    const service = await this.serviceRepo.findOne({
      where: { id },
      relations: ['serviceImage'],
    });

    if (!service) {
      throw new NotFoundException('Service non trouvé');
    }

    if (service.serviceImage) {
      const filePath = join(
        UPLOADS_FOLDER,
        'service',
        service.serviceImage.fileName,
      );
      if (existsSync(filePath)) {
        try {
          unlinkSync(filePath);
        } catch (error) {
          console.error(
            'Erreur lors de la suppression du fichier image :',
            error,
          );
        }
      }
    }

    await this.serviceRepo.remove(service);
    await this.serviceImageRepo.remove(service.serviceImage);

    return service;
  }
}
