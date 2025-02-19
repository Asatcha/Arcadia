import { IsNotEmpty, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ServiceImage } from './service-image.entity';
import { environment } from 'src/config/environments/environment';

@Entity()
@Unique(['name'])
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @MaxLength(1000)
  @IsNotEmpty()
  description: string;

  @OneToOne(() => ServiceImage, (image) => image.service)
  @JoinColumn()
  serviceImage: ServiceImage;

  get serviceImageUrl(): string {
    return this.serviceImage
      ? `${environment.baseUrl}/uploads/service/${this.serviceImage.fileName}`
      : null;
  }

  toJSON() {
    return {
      ...this,
      serviceImageUrl: this.serviceImageUrl,
    };
  }
}
