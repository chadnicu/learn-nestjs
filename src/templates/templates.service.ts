import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { templateExerciseTable, templateTable } from 'src/db/schema';
import { CreateTemplateDto, UpdateTemplateDto } from './dto';
import { UpdateTemplateExerciseDto } from './dto/update-template-exercise.dto';

@Injectable()
export class TemplatesService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async findAllByUser(userId: string) {
    return await this.db
      .select()
      .from(templateTable)
      .where(eq(templateTable.userId, userId));
  }

  async find(id: number) {
    return (
      await this.db.select().from(templateTable).where(eq(templateTable.id, id))
    )[0];
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

  async addExercise(
    templateId: number,
    exerciseId: number,
    body: UpdateTemplateExerciseDto,
  ) {
    await this.db
      .insert(templateExerciseTable)
      .values({ templateId, exerciseId, ...body });
  }

  async getExercises(templateId: number) {
    return await this.db
      .select()
      .from(templateExerciseTable)
      .where(eq(templateExerciseTable.templateId, templateId));
  }

  async updateExercise(
    templateExerciseId: number,
    body: UpdateTemplateExerciseDto,
  ) {
    await this.db
      .update(templateExerciseTable)
      .set(body)
      .where(eq(templateExerciseTable.id, templateExerciseId));
  }

  async removeExercise(templateExerciseId: number) {
    await this.db
      .delete(templateExerciseTable)
      .where(eq(templateExerciseTable.id, templateExerciseId));
  }
}
