import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitat } from './entities/habitat.entity';
import { CreateHabitatDto } from './dtos/create-habitat.dto';
import { UpdateHabitatDto } from './dtos/update-habitat.dto';
import { HabitatImage } from './entities/habitat-image.entity';
import { HabitatImageService } from './habitat-image.service';
import { plainToInstance } from 'class-transformer';
import { environment } from 'src/config/environment';

@Injectable()
export class HabitatService {
  constructor(
    @InjectRepository(Habitat) private habitatRepo: Repository<Habitat>,
    @InjectRepository(HabitatImage)
    private habitatImageRepo: Repository<HabitatImage>,
    private habitatImageService: HabitatImageService,
  ) {}

  async create(createHabitatDto: CreateHabitatDto, file: Express.Multer.File) {
    const { name, description, comments } = createHabitatDto;

    const foundHabitat = await this.habitatRepo.findOneBy({ name });

    if (foundHabitat) {
      throw new InternalServerErrorException('Habitat déjà existant.');
    }

    const newHabitat = this.habitatRepo.create({ name, description, comments });

    if (file) {
      const createdHabitatImage = new HabitatImage();
      createdHabitatImage.fileName = file.filename;
      createdHabitatImage.habitat = newHabitat;

      await this.habitatImageRepo.save(createdHabitatImage);
      console.log('Fichier enregistré à :', file.path);
      newHabitat.habitatImage = createdHabitatImage;
      await this.habitatRepo.save(newHabitat);
    }

    return plainToInstance(Habitat, newHabitat);
  }

  async findAll() {
    const habitats = await this.habitatRepo.find({
      relations: ['habitatImage'],
    });

    return habitats.map((habitat) => ({
      id: habitat.id,
      name: habitat.name,
      description: habitat.description,
      comments: habitat.comments,
      habitatImageUrl: habitat.habitatImage
        ? `${environment.baseUrl}/habitat/image/${habitat.habitatImage.fileName}`
        : null,
    }));
  }
}
