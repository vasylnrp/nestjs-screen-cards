import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(credentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = credentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      throw new ConflictException('Username already exists');
    }
  }

  async signIn(credentialsDto: AuthCredentialsDto): Promise<void> {
    const user = await this.findOne({ username: credentialsDto.username });
    if (
      user &&
      (await bcrypt.compare(credentialsDto.password, user.password))
    ) {
      return;
    } else {
      throw new UnauthorizedException();
    }
  }
}
