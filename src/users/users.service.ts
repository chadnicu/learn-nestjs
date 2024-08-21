import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { eq } from 'drizzle-orm';
import { userTable } from 'src/db/schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async create(data: CreateUserDto) {
    const hash = await bcrypt.hash(data.passwordHash, 10);

    const [created] = await this.db
      .insert(userTable)
      .values({ ...data, passwordHash: hash })
      .returning();

    return created;
  }

  async findById(id: number) {
    const [user] = await this.db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));

    if (!user) throw new NotFoundException(`User with id #${id} not found`);

    return user;
  }

  async findByUsername(username: string) {
    const [user] = await this.db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username));

    if (!user)
      throw new NotFoundException(`User with username #${username} not found`);

    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const [updated] = await this.db
      .update(userTable)
      .set(data)
      .where(eq(userTable.id, id))
      .returning();

    if (!updated) throw new NotFoundException(`User with id #${id} not found`);

    return updated;
  }

  async delete(id: number) {
    const [deleted] = await this.db
      .delete(userTable)
      .where(eq(userTable.id, id))
      .returning();

    if (!deleted) throw new NotFoundException(`User with id #${id} not found`);

    return deleted;
  }
}
