import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { templateTable } from 'src/db/schema';
import { CreateTemplateDto } from 'src/dto/templates/create-template.dto';
import { UpdateTemplateDto } from 'src/dto/templates/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async findAllByUser(userId: string) {
    return await this.db
      .select()
      .from(templateTable)
      .where(eq(templateTable.userId, userId));
  }

  async create(data: CreateTemplateDto) {
    await this.db.insert(templateTable).values(data);
  }

  async delete(id: number) {
    await this.db.delete(templateTable).where(eq(templateTable.id, id));
  }

  async update(id: number, data: UpdateTemplateDto) {
    await this.db
      .update(templateTable)
      .set(data)
      .where(eq(templateTable.id, id));
  }
}
