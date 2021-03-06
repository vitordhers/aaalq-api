import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt.interface';

@Injectable()
export class LowAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'lowAccessToken',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_PUBLIC,
    });
  }

  async validate(payload: JwtPayload) {
    const { id, access } = payload;
    if (access !== 'full' && access !== 'low') {
      throw new UnauthorizedException();
    }

    return id;
  }
}
