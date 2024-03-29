import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';

export class LocalStategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    try {
      return await this.usersService.verifyUser(email, password);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
