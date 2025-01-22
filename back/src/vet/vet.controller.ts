import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { VetService } from './vet.service';
import { CreateVetReportDto } from './dtos/create-vet-report.dto';
import { UpdateVetReportDto } from './dtos/update-vet-report.dto';
import { UpdateHabitatCommentsDto } from './dtos/update-habitat-comments.dto copy';

@Controller('vet')
export class VetController {
  constructor(private readonly vetService: VetService) {}

  // localhost:3000/vet
  @Post()
  create(@Body() createVetReportDto: CreateVetReportDto) {
    return this.vetService.create(createVetReportDto);
  }

  // localhost:3000/vet/animal/:id
  @Get('animal/:id')
  findAllByAnimal() {
    return this.vetService.findAllByAnimal();
  }

  // localhost:3000/vet/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVetReportDto: UpdateVetReportDto,
  ) {
    return this.vetService.update(+id, updateVetReportDto);
  }

  //localhost:3000/vet/habitat/:id
  @Patch('habitat/:id')
  updateHabitat(@Param('id') id: string, @Body() updateHabitatCommentsDto: UpdateHabitatCommentsDto) {
    return this.vetService.updateHabitat(+id, updateHabitatCommentsDto);
  }
}
