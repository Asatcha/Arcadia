import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [RatingController],
  providers: [RatingService, JwtService],
  imports: [TypeOrmModule.forFeature([Rating])],
})
export class RatingModule {}
