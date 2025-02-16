import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// localhost:3000/user
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // localhost:3000/user
  @Post()
  @UseGuards(RolesGuard)
  @Roles('isAdmin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // localhost:3000/user
  @Get()
  @UseGuards(RolesGuard)
  @Roles('isAdmin')
  findAll() {
    return this.userService.findAll();
  }

  // localhost:3000/user/:id
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('isAdmin')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // localhost:3000/user/:id
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('isAdmin')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
