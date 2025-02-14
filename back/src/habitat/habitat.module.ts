import { Module } from '@nestjs/common';
import { HabitatService } from './habitat.service';
import { HabitatController } from './habitat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitat } from './entities/habitat.entity';
import { HabitatImage } from './entities/habitat-image.entity';

@Module({
  controllers: [HabitatController],
  providers: [HabitatService],
  imports: [TypeOrmModule.forFeature([Habitat, HabitatImage])],
})
export class HabitatModule {}
