import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = request.cookies?.jwt;

    if (!token) {
      throw new UnauthorizedException('Accès refusé, token manquant.');
    }

    try {
      request.user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('Token invalide.');
    }

    const requiredRoles = this.getRequiredRoles(context);

    if (!this.hasRequiredRole(request.user, requiredRoles)) {
      throw new UnauthorizedException('Accès refusé, rôle insuffisant.');
    }

    return true;
  }

  private getRequiredRoles(context: ExecutionContext): string[] {
    const roles = Reflect.getMetadata('roles', context.getHandler()) || [];
    return roles;
  }

  private hasRequiredRole(user: any, roles: string[]): boolean {
    return roles.some((role) => user[role]);
  }
}
