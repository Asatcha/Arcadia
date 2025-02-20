import { SetMetadata } from '@nestjs/common';

export enum Role {
  Admin = 'isAdmin',
  Employee = 'isEmployee',
  Vet = 'isVet',
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
