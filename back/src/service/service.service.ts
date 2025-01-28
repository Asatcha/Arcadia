import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateServiceDto } from './dtos/update-service.dto';
import { CreateServiceDto } from './dtos/create-service.dto';
import { ServiceImage } from './entities/service-image.entity';
import { Repository } from 'typeorm';
import {ServiceImageService} from './service-image.service';

@Injectable()
export class ServiceService {

     constructor(
        @InjectRepository(Service) private serviceRepo: Repository<Service>,
        private serviceImageService: ServiceImageService,
      ) {}
    
      async create(createdServiceDto: CreateServiceDto) {
        const { name, description, serviceImage } = createdServiceDto;
    
        const foundHabitat = await this.serviceRepo.findOneBy({ name });
    
        if (foundHabitat) {
          throw new InternalServerErrorException('Service déjà existant.');
        }
    
        let createdServiceImage: ServiceImage;
        if (serviceImage) {
          createdServiceImage =
            await this.serviceImageService.saveImage(serviceImage);
        }
    
        const newService = this.serviceRepo.create({
          name,
          description,
          serviceImage: createdServiceImage,
        });
    
        await this.serviceRepo.save(newService);
    
        return {
          message: 'Service créé.',
          service: newService,
        };
      }
    
      async findAll() {
        const services = await this.serviceRepo.find();
    
        return {
          services: services,
        };
      }
    
      async findOne(id: number) {
        const service = await this.serviceRepo.findOneBy({ id });
    
        if (!service) {
          throw new NotFoundException(`Service ${service.name} non trouvé.`);
        }
    
        return {
          message: 'Service trouvé.',
          service: service,
        };
      }
    
      async update(id: number, updatedServiceDto: UpdateServiceDto) {
        const service = await this.serviceRepo.findOneBy({ id });
    
        if (!service) {
          throw new NotFoundException(`Service ${service.name} non trouvé.`);
        }
    
        if (updatedServiceDto.serviceImage) {
          if (service.serviceImage) {
            await this.serviceImageService.deleteImage(service.serviceImage);
          }
    
          const newImage = await this.serviceImageService.saveImage(
            updatedServiceDto.serviceImage,
          );
          service.serviceImage = newImage;
        }
    
        const updatedService = Object.assign(service, updatedServiceDto);
    
        await this.serviceRepo.save(updatedService);
    
        return {
          message: 'Service modifié.',
          service: updatedService,
        };
      }
    
      async delete(id: number) {
        const service = await this.serviceRepo.findOneBy({ id });
    
        if (!service) {
          throw new NotFoundException(`Service ${id} non trouvé.`);
        }
    
        await this.serviceRepo.remove(service);
    
        return {
          message: `Service ${service.name} supprimé avec succès.`,
        };
      }
}
