import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateSetDto, UpdateTemplateSetDto } from './dto';
import { Database, DrizzleAsyncProvider } from '../db/db.module';
import {
  exerciseTable,
  templateExerciseTable,
  templateSetTable,
  templateTable,
} from '../db/schema';
import { and, eq } from 'drizzle-orm';
import { TemplateExercisesService } from '../template-exercises/template-exercises.service';
import { excludeInternalFields } from '../common/utils/exclude-fields.util';

@Injectable()
export class TemplateSetsService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: Database,
    private templateExercisesService: TemplateExercisesService,
  ) {}

  async create(
    data: CreateTemplateSetDto & { templateExerciseId: number; userId: number },
  ) {
    const { userId, ...values } = data;

    // check if it belongs to user
    await this.templateExercisesService.findOne(
      data.templateExerciseId,
      userId,
    );

    const [created] = await this.db
      .insert(templateSetTable)
      .values(values)
      .returning();

    return created;
  }

  async findAllByTemplateExerciseId(
    templateExerciseId: number,
    userId: number,
  ) {
    const sets = await this.db
      .select(excludeInternalFields(templateSetTable))
      .from(templateSetTable)
      .innerJoin(
        templateExerciseTable,
        eq(templateSetTable.templateExerciseId, templateExerciseTable.id),
      )
      .innerJoin(
        templateTable,
        eq(templateExerciseTable.templateId, templateTable.id),
      )
      .innerJoin(
        exerciseTable,
        eq(templateExerciseTable.exerciseId, exerciseTable.id),
      )
      .where(
        and(
          eq(templateSetTable.templateExerciseId, templateExerciseId),
          eq(templateExerciseTable.id, templateExerciseId),
          eq(templateTable.userId, userId),
          eq(exerciseTable.userId, userId),
        ),
      );

    return sets;
  }

  async findOne(id: number, userId: number) {
    const [found] = await this.db
      .select(excludeInternalFields(templateSetTable))
      .from(templateSetTable)
      .innerJoin(
        templateExerciseTable,
        eq(templateSetTable.templateExerciseId, templateExerciseTable.id),
      )
      .innerJoin(
        exerciseTable,
        eq(templateExerciseTable.exerciseId, exerciseTable.id),
      )
      .innerJoin(
        templateTable,
        eq(templateExerciseTable.templateId, templateTable.id),
      )
      .where(
        and(
          eq(templateSetTable.id, id),
          eq(templateTable.userId, userId),
          eq(exerciseTable.userId, userId),
        ),
      );

    if (!found)
      throw new NotFoundException(
        `Template_Set with id #${id} not found or not accessible`,
      );

    return found;
  }

  async update(id: number, data: UpdateTemplateSetDto & { userId: number }) {
    const { userId, ...values } = data;

    // check if it belongs to user
    await this.findOne(id, userId);

    const [updated] = await this.db
      .update(templateSetTable)
      .set({ ...values, templateExerciseId: undefined })
      .where(eq(templateSetTable.id, id))
      .returning();

    if (!updated)
      throw new NotFoundException(
        `Template_Set with id #${id} not found or not accessible`,
      );

    return updated;
  }

  async delete(id: number, userId: number) {
    // check if it belongs to user
    await this.findOne(id, userId);

    const [deleted] = await this.db
      .delete(templateSetTable)
      .where(eq(templateSetTable.id, id))
      .returning();

    if (!deleted)
      throw new NotFoundException(
        `Template_Set with id #${id} not found or not accessible`,
      );

    return deleted;
  }
}
