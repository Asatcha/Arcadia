import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
  NotFoundException,
} from '@nestjs/common';
import { HabitatService } from './habitat.service';
import { CreateHabitatDto } from './dtos/create-habitat.dto';
import { UpdateHabitatDto } from './dtos/update-habitat.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig, UPLOADS_FOLDER } from '../config/multer.config';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';
import { Response } from 'express';

// localhost:3000/habitat
@Controller('habitat')
export class HabitatController {
  constructor(private readonly habitatService: HabitatService) {}

  // localhost:3000/habitat
  @Post()
  @UseInterceptors(FileInterceptor('habitatImage', multerConfig('habitat')))
  create(
    @Body() createHabitatDto: CreateHabitatDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.habitatService.create(createHabitatDto, file);
  }

  // localhost:3000/habitat
  @Get()
  findAll() {
    return this.habitatService.findAll();
  }

  // localhost:3000/habitat/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.habitatService.findOne(+id);
  }

  // Récupérer l'image du dossier uploads
  @Get('image/:fileName')
  getImage(
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ): StreamableFile {
    const filePath = join(UPLOADS_FOLDER, 'habitat', fileName);

    console.log('Tentative de récupération de l’image depuis :', filePath);

    if (!existsSync(filePath)) {
      throw new NotFoundException('Image non trouvée');
    }

    const fileStream = createReadStream(filePath);
    res.set({
      'Content-Type': 'image/*',
      'Content-Disposition': `inline; filename="${fileName}"`,
    });

    return new StreamableFile(fileStream);
  }

  // localhost:3000/habitat/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitatDto: UpdateHabitatDto) {
    // return this.habitatService.update(+id, updateHabitatDto);
  }

  // localhost:3000/habitat/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    // return this.habitatService.delete(+id);
  }
}
