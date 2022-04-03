import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async verify(token: string) {
    try {
      const v = await this.jwtService.verify(token);
      if (v) {
        return true;
      } else {
        throw new Error('Auth Fail');
      }
    } catch (error) {
      throw new Error('Auth Fail');
    }
  }
}
