import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>, @InjectRepository(Role) private roleRepo: Repository<Role>) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const foundUser = await this.userRepo.findOneBy({ email });

    if (!foundUser) {
      throw new UnauthorizedException('Utilisateur non trouvé.');
    }
    
    if (foundUser.password !== password) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    return {
      message: 'Connexion réussie',
      user: {
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, roleId } = registerDto;

    const foundUser = await this.userRepo.findOneBy({ email });
    
    if (foundUser) {
      throw new InternalServerErrorException('Utilisateur déjà existant.');
    }

    const newUser = this.userRepo.create({
      email,
      password,
      firstName,
      lastName,
      role: await this.roleRepo.findOneBy({ id: roleId }),
    });

    await this.userRepo.save(newUser);

    return {
      message: 'Utilisateur créé.',
      user: {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role.label,
      },
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
