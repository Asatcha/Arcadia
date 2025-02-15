import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './entities/breed.entity';
import { CreateBreedDto } from './dtos/create-breed.dto';

@Injectable()
export class BreedService {
  constructor(@InjectRepository(Breed) private breedRepo: Repository<Breed>) {}

  async create(createBreedDto: CreateBreedDto) {
    const { name } = createBreedDto;

    const foundBreed = await this.breedRepo.findOneBy({ name });

    if (foundBreed) {
      throw new InternalServerErrorException('Race déjà existante.');
    }

    const newBreed = this.breedRepo.create({
      name,
    });

    await this.breedRepo.save(newBreed);

    return newBreed;
  }

  async findAll() {
    const breeds = await this.breedRepo.find();

    return breeds;
  }
}
