import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class ServiceImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea' })
  image: Buffer;

  @OneToOne(() => Service, (service) => service.serviceImage)
  service: Service;
}
