import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBreedDto } from './dtos/create-breed.dto';
import { BreedService } from './breed.service';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  // localhost:3000/breed
  @Post()
  createBreed(@Body() createBreedDto: CreateBreedDto) {
    return this.breedService.create(createBreedDto);
  }

  // localhost:3000/breed
  @Get()
  findAllBreeds() {
    return this.breedService.findAll();
  }
}
