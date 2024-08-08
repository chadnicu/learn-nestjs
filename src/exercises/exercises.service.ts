import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { exerciseTable } from 'src/db/schema';
import { CreateExerciseDto } from 'src/dto/exercises/create-exericse.dto';
import { UpdateExerciseDto } from 'src/dto/exercises/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async findAllByUser(userId: string) {
    return await this.db
      .select()
      .from(exerciseTable)
      .where(eq(exerciseTable.userId, userId));
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
