import { IsDate, IsNotEmpty, MaxLength, maxLength } from 'class-validator';
import { Animal } from 'src/animal/entities/animal.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class FoodReport {
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

  @ManyToOne(() => Animal, (animal) => animal.foodReports)
  animal: Animal;
}
