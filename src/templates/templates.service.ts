import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { Database, DrizzleAsyncProvider } from '../db/db.module';
import { templateTable } from '../db/schema';
import { CreateTemplateDto, UpdateTemplateDto } from './dto';

@Injectable()
export class TemplatesService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async create(data: CreateTemplateDto & { userId: number }) {
    const [created] = await this.db
      .insert(templateTable)
      .values(data)
      .returning();

    return created;
  }

  async find(id: number, userId: number) {
    const [template] = await this.db
      .select()
      .from(templateTable)
      .where(and(eq(templateTable.id, id), eq(templateTable.userId, userId)));

    if (!template)
      throw new NotFoundException(
        `Template with id #${id} not found or not accessible`,
      );

    return template;
  }

  findAllByUser(userId: number) {
    const templates = this.db
      .select()
      .from(templateTable)
      .where(eq(templateTable.userId, userId));

    return templates;
  }

  async update(id: number, data: UpdateTemplateDto & { userId: number }) {
    const { userId, ...values } = data;

    const [updated] = await this.db
      .update(templateTable)
      .set(values)
      .where(and(eq(templateTable.id, id), eq(templateTable.userId, userId)))
      .returning();

    if (!updated)
      throw new NotFoundException(
        `Template with id #${id} not found or not accessible`,
      );

    return updated;
  }

  async delete(id: number, userId: number) {
    const [deleted] = await this.db
      .delete(templateTable)
      .where(and(eq(templateTable.id, id), eq(templateTable.userId, userId)))
      .returning();

    if (!deleted)
      throw new NotFoundException(
        `Template with id #${id} not found or not accessible`,
      );

    return deleted;
  }
}
