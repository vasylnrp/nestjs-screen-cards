import { EntityRepository, Repository } from "typeorm";
import { User } from './user.entity';

@EntityRepository()
class UsersRepository extends Repository<User> {
  //
}
