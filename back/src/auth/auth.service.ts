import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const foundUser = await this.userRepo.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!foundUser) {
      throw new UnauthorizedException('Utilisateur non trouvé.');
    }

    if (foundUser.password !== password) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const payload = {
      sub: foundUser.id,
      email: foundUser.email,
      isAdmin: foundUser.role.id === 1,
      isEmployee: foundUser.role.id === 2,
      isVet: foundUser.role.id === 3,
    };

    let role: 'isAdmin' | 'isEmployee' | 'isVet';

    switch (foundUser.role.id) {
      case 1:
        role = 'isAdmin';
        break;
      case 2:
        role = 'isEmployee';
        break;
      case 3:
        role = 'isVet';
        break;
      default:
        throw new UnauthorizedException('Rôle inconnu.');
    }

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { accessToken: token, user: plainToInstance(User, foundUser), role };
  }
}
