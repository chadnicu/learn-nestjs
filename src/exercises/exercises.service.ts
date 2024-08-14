import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { exerciseTable } from 'src/db/schema';
import { CreateExerciseDto, UpdateExerciseDto } from './dto';

@Injectable()
export class ExercisesService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async create(data: CreateExerciseDto) {
    const [created] = await this.db
      .insert(exerciseTable)
      .values(data)
      .returning();

    return created;
  }

  async find(id: number) {
    const [exercise] = await this.db
      .select()
      .from(exerciseTable)
      .where(eq(exerciseTable.id, id))
      .limit(1);

    if (!exercise)
      throw new NotFoundException(`Exercise with id #${id} not found`);

    return exercise;
  }

  findAllByUser(userId: number) {
    const exercises = this.db
      .select()
      .from(exerciseTable)
      .where(eq(exerciseTable.userId, userId));

    return exercises;
  }

  async update(id: number, data: UpdateExerciseDto) {
    const [updated] = await this.db
      .update(exerciseTable)
      .set(data)
      .where(eq(exerciseTable.id, id))
      .returning();

    if (!updated)
      throw new NotFoundException(`Exercise with id #${id} not found`);

    return updated;
  }

  async delete(id: number) {
    const [deleted] = await this.db
      .delete(exerciseTable)
      .where(eq(exerciseTable.id, id))
      .returning();

    if (!deleted)
      throw new NotFoundException(`Exercise with id #${id} not found`);

    return deleted;
  }
}
