import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateSetDto, UpdateTemplateSetDto } from './dto';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { templateSetTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class TemplateSetsService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async create(body: CreateTemplateSetDto & { templateExerciseId: number }) {
    const [created] = await this.db
      .insert(templateSetTable)
      .values(body)
      .returning();

    return created;
  }

  // not sure if I'll ever need to find just one
  findAllByTemplateExerciseId(templateExerciseId: number) {
    const sets = this.db
      .select()
      .from(templateSetTable)
      .where(eq(templateSetTable.templateExerciseId, templateExerciseId));

    return sets;
  }

  async update(id: number, data: UpdateTemplateSetDto) {
    const [updated] = await this.db
      .update(templateSetTable)
      .set({ templateExerciseId: undefined, ...data })
      .where(eq(templateSetTable.id, id))
      .returning();

    if (!updated)
      throw new NotFoundException(`Template_Set with id #${id} not found`);

    return updated;
  }

  async delete(id: number) {
    const [deleted] = await this.db
      .delete(templateSetTable)
      .where(eq(templateSetTable.id, id))
      .returning();

    if (!deleted)
      throw new NotFoundException(`Template_Set with id #${id} not found`);

    return deleted;
  }
}
