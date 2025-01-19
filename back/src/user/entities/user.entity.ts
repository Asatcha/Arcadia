import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { Role } from "src/auth/entities/role.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

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
    @Exclude()
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
