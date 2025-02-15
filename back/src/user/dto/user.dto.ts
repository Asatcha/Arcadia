import { Role } from 'src/auth/entities/role.entity';
import { BaseDto } from 'src/shared/base.dto';

export class UserDto extends BaseDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: number;
  role: Role;
}
