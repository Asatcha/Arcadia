import { Role } from 'src/auth/entities/role.entity';

export class UserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: number;
  role: Role;
}
