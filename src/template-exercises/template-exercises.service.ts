import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import {
  AddExerciseToTemplateDto,
  CreateTemplateExerciseDto,
  UpdateTemplateExerciseDto,
} from './dto';
import { templateExerciseTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class TemplateExercisesService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async create(data: AddExerciseToTemplateDto & CreateTemplateExerciseDto) {
    const [created] = await this.db
      .insert(templateExerciseTable)
      .values(data)
      .returning();

    return created;
  }

  findAll(templateId: number) {
    const templates = this.db
      .select()
      .from(templateExerciseTable)
      .where(eq(templateExerciseTable.templateId, templateId));

    return templates;
  }

  async update(id: number, body: UpdateTemplateExerciseDto) {
    const [updated] = await this.db
      .update(templateExerciseTable)
      .set(body)
      .where(eq(templateExerciseTable.id, id))
      .returning();

    if (!updated)
      throw new NotFoundException(`Template_Exercise with id #${id} not found`);

    return updated;
  }

  async delete(id: number) {
    const [deleted] = await this.db
      .delete(templateExerciseTable)
      .where(eq(templateExerciseTable.id, id))
      .returning();

    if (!deleted)
      throw new NotFoundException(`Template_Exercise with id #${id} not found`);

    return deleted;
  }
}
