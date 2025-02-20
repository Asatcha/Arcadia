import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsNotEmpty, MaxLength } from 'class-validator';
import { Animal } from './animal.entity';

@Entity()
export class VetReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @Column()
  @MaxLength(20)
  @IsNotEmpty()
  food: string;

  @Column()
  @IsNotEmpty()
  foodWeight: number;

  @Column({ nullable: true })
  @MaxLength(50)
  status: string;

  @Column({ nullable: true })
  @MaxLength(200)
  details: string;

  @ManyToOne(() => Animal, (animal) => animal.vetReports)
  animal: Animal;
}
