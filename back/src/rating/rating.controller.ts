import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateRatingDto } from './dtos/update-rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  // localhost:3000/rating
  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(createRatingDto);
  }

  // localhost:3000/rating
  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  // localhost:3000/rating/to-validate
  @Get('to-validate')
  findAllToValidate() {
    return this.ratingService.findAllToValidate();
  }

  // localhost:3000/rating/:id
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('isEmployee')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(+id, updateRatingDto);
  }

  // localhost:3000/rating/:id
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('isEmployee')
  delete(@Param('id') id: string) {
    return this.ratingService.delete(+id);
  }
}
