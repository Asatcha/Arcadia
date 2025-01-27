import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitatImage } from './entities/habitat-image.entity';

@Injectable()
export class HabitatImageService {
  constructor(
    @InjectRepository(HabitatImage)
    private readonly habitatImageRepo: Repository<HabitatImage>,
  ) {}

  async saveImage(buffer: Buffer) {
    const newImage = this.habitatImageRepo.create({
      image: buffer,
    });
    return this.habitatImageRepo.save(newImage);
  }

  async deleteImage(habitatImage: HabitatImage) {
    return this.habitatImageRepo.remove(habitatImage);
  }
}
