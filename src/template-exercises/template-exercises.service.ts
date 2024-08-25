import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import {
  AddExerciseToTemplateDto,
  CreateTemplateExerciseDto,
  UpdateTemplateExerciseDto,
} from './dto';
import {
  exerciseTable,
  templateExerciseTable,
  templateTable,
} from 'src/db/schema';
import { and, eq } from 'drizzle-orm';
import { ExercisesService } from 'src/exercises/exercises.service';
import { TemplatesService } from 'src/templates/templates.service';
import { excludeInternalFields } from 'src/common/utils/exclude-fields.util';

@Injectable()
export class TemplateExercisesService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: Database,
    private exercisesService: ExercisesService,
    private templatesService: TemplatesService,
  ) {}

  async create(
    data: AddExerciseToTemplateDto & CreateTemplateExerciseDto,
    userId: number,
  ) {
    // Just to check they both belong to user
    await Promise.all([
      this.exercisesService.find(data.exerciseId, userId),
      this.templatesService.find(data.templateId, userId),
    ]);

    const [created] = await this.db
      .insert(templateExerciseTable)
      .values(data)
      .returning();

    return created;
  }

  async findAllByUser(templateId: number, userId: number) {
    const templateExercises = await this.db
      .select(excludeInternalFields(templateExerciseTable))
      .from(templateExerciseTable)
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
          eq(templateExerciseTable.templateId, templateId),
          eq(templateTable.userId, userId),
          eq(exerciseTable.userId, userId),
        ),
      );

    return templateExercises;
  }

  async findOne(id: number, userId: number) {
    const [found] = await this.db
      .select(excludeInternalFields(templateExerciseTable))
      .from(templateExerciseTable)
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
          eq(templateExerciseTable.id, id),
          eq(templateTable.userId, userId),
          eq(exerciseTable.userId, userId),
        ),
      );

    if (!found)
      throw new NotFoundException(
        `Template_Exercise with id #${id} not found or not accessible`,
      );

    return found;
  }

  async update(
    id: number,
    data: UpdateTemplateExerciseDto & { userId: number },
  ) {
    const { userId, ...values } = data;

    // Just to check they all belong to user
    await Promise.all([
      this.findOne(id, userId),
      this.exercisesService.find(data.exerciseId, userId),
      this.templatesService.find(data.templateId, userId),
    ]);

    const [updated] = await this.db
      .update(templateExerciseTable)
      .set(values)
      .where(eq(templateExerciseTable.id, id))
      .returning();

    if (!updated)
      throw new NotFoundException(
        `Template_Exercise with id #${id} not found or not accessible`,
      );

    return updated;
  }

  async delete(id: number, userId: number) {
    // Just to check it belongs to user
    await this.findOne(id, userId);

    const [deleted] = await this.db
      .delete(templateExerciseTable)
      .where(eq(templateExerciseTable.id, id))
      .returning();

    if (!deleted)
      throw new NotFoundException(
        `Template_Exercise with id #${id} not found or not accessible`,
      );

    return deleted;
  }
}
