import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/token.model';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!!roles) {
      const request = context.switchToHttp().getRequest();
      const payload = request.user as PayloadToken;
      // const isAuth = roles.some((role) => role === payload.role);
      const isAuth = roles.includes(payload.role as Role);
      if (!isAuth) {
        throw new UnauthorizedException('Your role is wrong');
      }
    }
    return true;
  }
}
