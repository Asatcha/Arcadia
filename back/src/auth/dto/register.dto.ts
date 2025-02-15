import { Role } from '../entities/role.entity';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  firstName: string;
  lastName: string;
  roleId: number;
  role: Role;
}
