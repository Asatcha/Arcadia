import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
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
