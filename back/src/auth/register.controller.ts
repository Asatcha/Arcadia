import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

// localhost:3000/register
@Controller('register')
export class RegisterController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }
}
