import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from "./role.entity";

@Entity()
@Unique(['email'])

export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column()
    @MaxLength(20)
    @IsNotEmpty()
    firstName: string;

    @Column()
    @MaxLength(20)
    @IsNotEmpty()
    lastName: string;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
}
