import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/users.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user._id };
    const { password: password, ...userPayload } = user.toJSON();
    return {
      access_token: this.jwtService.sign(payload),
      userPayload,
    };
  }
}
