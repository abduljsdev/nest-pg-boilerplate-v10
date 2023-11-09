import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }
  async validate(req, email: string, password: string): Promise<any> {
    return this.authService.validateUser(email, password, req.body.role);
  }
}
