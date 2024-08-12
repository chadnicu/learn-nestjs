import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { exerciseTable } from 'src/db/schema';
import { CreateExerciseDto, UpdateExerciseDto } from './dto';

@Injectable()
export class ExercisesService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async findAllByUser(userId: string) {
    return await this.db
      .select()
      .from(exerciseTable)
      .where(eq(exerciseTable.userId, userId));
  }

  async find(id: number) {
    return (
      await this.db.select().from(exerciseTable).where(eq(exerciseTable.id, id))
    )[0];
  }

  async create(data: CreateExerciseDto) {
    await this.db.insert(exerciseTable).values(data);
  }

  async delete(id: number) {
    await this.db.delete(exerciseTable).where(eq(exerciseTable.id, id));
  }

  async update(id: number, data: UpdateExerciseDto) {
    await this.db
      .update(exerciseTable)
      .set(data)
      .where(eq(exerciseTable.id, id));
  }
}
