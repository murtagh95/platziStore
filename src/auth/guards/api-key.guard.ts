import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import config from '../../../config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.reflector.get(IS_PUBLIC_KEY, context.getHandler())) {
      return true;
    }
    const requests = context.switchToHttp().getRequest<Request>();
    const authHeader = requests.header('Auth');
    if (authHeader !== this.configService.apiKey) {
      throw new UnauthorizedException('Not allow');
    }
    return true;
  }
}
