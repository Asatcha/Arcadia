import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // localhost:3000/role
  @Get()
  findAllRoles() {
    return this.roleService.findAll();
  }
}
