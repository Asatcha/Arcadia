import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { Response } from 'express';

// localhost:3000/login
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { accessToken, user, role } = await this.authService.login(loginDto);
    
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1800000,
    });

    return res.send({ accessToken, user, role });
  }
}
