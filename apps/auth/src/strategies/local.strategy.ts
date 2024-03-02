import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

export class LocalStategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    return this.userService.validateUser(email, password);
  }
}
