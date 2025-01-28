import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceImage } from './entities/service-image.entity';
import { ServiceImageService } from './service-image.service';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, ServiceImageService],
  imports: [TypeOrmModule.forFeature([Service, ServiceImage])],
})
export class ServiceModule {}
