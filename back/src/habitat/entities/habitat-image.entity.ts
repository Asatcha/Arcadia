import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Habitat } from './habitat.entity';

@Entity()
export class HabitatImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea' })
  image: Buffer;

  @OneToOne(() => Habitat, (habitat) => habitat.habitatImage)
  habitat: Habitat;
}

