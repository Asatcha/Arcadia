import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalImage } from './entities/animal-image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnimalImageService {
  constructor(
    @InjectRepository(AnimalImage)
    private readonly animalImageRepo: Repository<AnimalImage>,
  ) {}

  async saveImage(buffer: Buffer) {
    const newImage = this.animalImageRepo.create({
      image: buffer,
    });
    return this.animalImageRepo.save(newImage);
  }

  async deleteImage(animalImage: AnimalImage) {
    return this.animalImageRepo.remove(animalImage);
  }
}
