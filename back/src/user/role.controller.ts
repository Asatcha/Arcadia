import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role, Roles } from 'src/auth/roles.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // localhost:3000/role
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  findAllRoles() {
    return this.roleService.findAll();
  }
}
