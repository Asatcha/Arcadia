import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dtos/create-service.dto';
import { multerConfig } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateServiceDto } from './dtos/update-service.dto';

// localhost:3000/service
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  // localhost:3000/service
  @Post()
  @UseInterceptors(FileInterceptor('serviceImage', multerConfig('service')))
  create(
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.serviceService.create(createServiceDto, file);
  }

  // localhost:3000/service
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  // localhost:3000/service/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOneById(+id);
  }

  // localhost:3000/service/:id
  @Patch(':id')
  @UseInterceptors(FileInterceptor('serviceImage', multerConfig('service')))
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  // localhost:3000/service/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceService.delete(+id);
  }
}
