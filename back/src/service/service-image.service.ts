import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceImage } from './entities/service-image.entity';

@Injectable()
export class ServiceImageService {
  constructor(
    @InjectRepository(ServiceImage)
    private readonly serviceImageRepo: Repository<ServiceImage>,
  ) {}

  async saveImage(buffer: Buffer) {
    const newImage = this.serviceImageRepo.create({
      image: buffer,
    });
    return this.serviceImageRepo.save(newImage);
  }

  async deleteImage(serviceImage: ServiceImage) {
    return this.serviceImageRepo.remove(serviceImage);
  }
}
