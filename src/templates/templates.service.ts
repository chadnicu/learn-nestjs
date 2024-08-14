import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { templateTable } from 'src/db/schema';
import { CreateTemplateDto, UpdateTemplateDto } from './dto';

@Injectable()
export class TemplatesService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async create(data: CreateTemplateDto) {
    const [created] = await this.db
      .insert(templateTable)
      .values(data)
      .returning();

    return created;
  }

  async find(id: number) {
    const [template] = await this.db
      .select()
      .from(templateTable)
      .where(eq(templateTable.id, id));

    if (!template)
      throw new NotFoundException(`Template with id #${id} not found`);

    return template;
  }

  findAllByUser(userId: number) {
    const templates = this.db
      .select()
      .from(templateTable)
      .where(eq(templateTable.userId, userId));

    return templates;
  }

  async update(id: number, data: UpdateTemplateDto) {
    const [updated] = await this.db
      .update(templateTable)
      .set(data)
      .where(eq(templateTable.id, id))
      .returning();

    if (!updated)
      throw new NotFoundException(`Template with id #${id} not found`);

    return updated;
  }

  async delete(id: number) {
    const [deleted] = await this.db
      .delete(templateTable)
      .where(eq(templateTable.id, id))
      .returning();

    if (!deleted)
      throw new NotFoundException(`Template with id #${id} not found`);

    return deleted;
  }
}
