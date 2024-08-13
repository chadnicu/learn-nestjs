import { Inject, Injectable } from '@nestjs/common';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { eq } from 'drizzle-orm';
import { userTable } from 'src/db/schema';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async find(username: string) {
    return (
      await this.db
        .select()
        .from(userTable)
        .where(eq(userTable.username, username))
    )[0];
  }

  async create(data: CreateUserDto) {
    await this.db.insert(userTable).values(data);
  }

  async delete(id: number) {
    await this.db.delete(userTable).where(eq(userTable.id, id));
  }

  async update(id: number, data: UpdateUserDto) {
    await this.db.update(userTable).set(data).where(eq(userTable.id, id));
  }
}
