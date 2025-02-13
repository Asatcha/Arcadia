import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitatImage } from './entities/habitat-image.entity';
import { Habitat } from './entities/habitat.entity';

@Injectable()
export class HabitatImageService {
  constructor(
    @InjectRepository(Habitat)
    private readonly habitatRepo: Repository<Habitat>,
    @InjectRepository(HabitatImage)
    private readonly habitatImageRepo: Repository<HabitatImage>,
  ) {}

  async uploadImage(
    habitatId: number,
    fileName: string,
  ): Promise<HabitatImage> {
    const habitat = await this.habitatRepo.findOneBy({ id: habitatId });
    if (!habitat) {
      throw new Error('Habitat non trouvé');
    }

    const habitatImage = new HabitatImage();
    habitatImage.fileName = fileName;
    habitatImage.habitat = habitat;

    return await this.habitatImageRepo.save(habitatImage);
  }
}
