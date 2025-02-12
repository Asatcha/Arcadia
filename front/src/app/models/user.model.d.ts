import { Base } from './base.model';
import { Role } from './role.model';

export interface User extends Base {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
  role: Role;
}
