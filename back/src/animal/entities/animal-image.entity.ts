import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Animal } from './animal.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['fileName'])
export class AnimalImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @OneToOne(() => Animal, (animal) => animal.animalImage, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @Exclude()
  animal: Animal;
}
