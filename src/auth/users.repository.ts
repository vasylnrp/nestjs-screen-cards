import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(credentialsDto: AuthCredentialsDto): Promise<void> {
    const user = this.create(credentialsDto);
    try {
      await this.save(user);
    } catch (error) {
      throw new ConflictException('Username already exists');
    }
  }
}
