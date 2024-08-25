import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { exerciseTable } from 'src/db/schema';
import { CreateExerciseDto, UpdateExerciseDto } from './dto';

@Injectable()
export class ExercisesService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async create(data: CreateExerciseDto & { userId: number }) {
    const [created] = await this.db
      .insert(exerciseTable)
      .values(data)
      .returning();

    return created;
  }

  async find(id: number, userId: number) {
    const [exercise] = await this.db
      .select()
      .from(exerciseTable)
      .where(and(eq(exerciseTable.id, id), eq(exerciseTable.userId, userId)))
      .limit(1);

    if (!exercise)
      throw new NotFoundException(
        `Exercise with id #${id} not found or not accessible`,
      );

    return exercise;
  }

  findAllByUser(userId: number) {
    const exercises = this.db
      .select()
      .from(exerciseTable)
      .where(eq(exerciseTable.userId, userId));

    return exercises;
  }

  async update(id: number, data: UpdateExerciseDto & { userId: number }) {
    const { userId, ...values } = data;

    const [updated] = await this.db
      .update(exerciseTable)
      .set(values)
      .where(and(eq(exerciseTable.id, id), eq(exerciseTable.userId, userId)))
      .returning();

    if (!updated)
      throw new NotFoundException(
        `Exercise with id #${id} not found or not accessible`,
      );

    return updated;
  }

  async delete(id: number, userId: number) {
    const [deleted] = await this.db
      .delete(exerciseTable)
      .where(and(eq(exerciseTable.id, id), eq(exerciseTable.userId, userId)))
      .returning();

    if (!deleted)
      throw new NotFoundException(
        `Exercise with id #${id} not found or not accessible`,
      );

    return deleted;
  }
}
