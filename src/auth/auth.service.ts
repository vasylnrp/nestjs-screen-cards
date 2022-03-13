import { Inject, Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  @Inject()
  private usersRepository: UsersRepository;

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.usersRepository.createUser(authCredentialsDto);
  }
}
