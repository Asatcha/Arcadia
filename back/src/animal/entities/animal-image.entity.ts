import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Animal } from './animal.entity';

@Entity()
export class AnimalImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea' })
  image: Buffer;

  @OneToOne(() => Animal, (animal) => animal.animalImage)
  animal: Animal;
}
