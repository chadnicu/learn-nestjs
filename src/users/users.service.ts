import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Database, DrizzleAsyncProvider } from '../db/db.module';
import { eq } from 'drizzle-orm';
import { userTable } from '../db/schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async create(data: CreateUserDto) {
    const { password, ...values } = data;

    const passwordHash = await bcrypt.hash(password, 10);

    const [created] = await this.db
      .insert(userTable)
      .values({ ...values, passwordHash })
      .returning();

    return created;
  }

  async findById(id: number) {
    const [user] = await this.db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));

    if (!user)
      throw new NotFoundException(
        `User with id #${id} not found or not accessible`,
      );

    return user;
  }

  async findByUsername(username: string) {
    const [user] = await this.db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username));

    if (!user)
      throw new NotFoundException(
        `User with username #${username} not found or not accessible`,
      );

    return user;
  }

  async update(data: UpdateUserDto & { userId: number }) {
    const { userId, ...values } = data;

    const [updated] = await this.db
      .update(userTable)
      // @ts-expect-error this shouldn't error
      .set({ ...values, updatedAt: new Date().getTime() })
      .where(eq(userTable.id, userId))
      .returning();

    if (!updated)
      throw new NotFoundException(
        `User with id #${userId} not found or not accessible`,
      );

    return updated;
  }

  async delete(id: number) {
    const [deleted] = await this.db
      .delete(userTable)
      .where(eq(userTable.id, id))
      .returning();

    if (!deleted)
      throw new NotFoundException(
        `User with id #${id} not found or not accessible`,
      );

    return deleted;
  }
}
