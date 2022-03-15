import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { JwtPayload } from './jwt-payload';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  @Inject()
  private usersRepository: UsersRepository;

  @Inject()
  private jwtService: JwtService;

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return await this.usersRepository.createUser(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialsDto): Promise<string> {
    const user = await this.usersRepository.signIn(authCredentials);
    const { username } = user;
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
