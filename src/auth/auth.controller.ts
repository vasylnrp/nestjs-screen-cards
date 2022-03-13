import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Post('/sign-up')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('/sign-in')
  async signIn(@Body() authCredentials: AuthCredentialsDto): Promise<void> {
    return await this.authService.signIn(authCredentials);
  }
}
