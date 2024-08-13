import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';

export type User = CreateUserDto;

@Injectable()
export class UsersService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
