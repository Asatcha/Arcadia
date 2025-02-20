import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateBreedDto } from './dtos/create-breed.dto';
import { BreedService } from './breed.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role, Roles } from 'src/auth/roles.decorator';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  // localhost:3000/breed
  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  createBreed(@Body() createBreedDto: CreateBreedDto) {
    return this.breedService.create(createBreedDto);
  }

  // localhost:3000/breed
  @Get()
  findAllBreeds() {
    return this.breedService.findAll();
  }
}
