import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/user/entities/user.entity';

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
}
