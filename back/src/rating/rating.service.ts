import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { UpdateRatingDto } from './dtos/update-rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating) private ratingRepo: Repository<Rating>,
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    const { stars, name, comment } = createRatingDto;

    const newRating = this.ratingRepo.create({
      stars,
      name,
      comment,
    });

    await this.ratingRepo.save(newRating);

    return newRating;
  }

  async findAll() {
    const ratings = await this.ratingRepo.find({ where: { isValid: true } });

    return ratings;
  }

  async findAllToValidate() {
    const ratingsToValidate = await this.ratingRepo.find({
      where: { isValid: false },
    });

    return ratingsToValidate;
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    const rating = await this.ratingRepo.findOneBy({ id });

    if (!rating) {
      throw new NotFoundException(`Avis avec l'id ${id} non trouvé.`);
    }

    const updatedRating = { ...rating, ...updateRatingDto };

    await this.ratingRepo.save(updatedRating);

    return updatedRating;
  }

  async delete(id: number) {
    const rating = await this.ratingRepo.findOneBy({ id });

    if (!rating) {
      throw new NotFoundException(`Avis avec l'id ${id} non trouvé.`);
    }

    const deletedRating = await this.ratingRepo.remove(rating);

    return deletedRating;
  }
}
