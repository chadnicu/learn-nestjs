import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { workoutExerciseTable, workoutTable } from 'src/db/schema';
import {
  CreateWorkoutDto,
  UpdateWorkoutDto,
  UpdateWorkoutExerciseDto,
} from './dto';

@Injectable()
export class WorkoutsService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async findAllByUser(userId: string) {
    return await this.db
      .select()
      .from(workoutTable)
      .where(eq(workoutTable.userId, userId));
  }

  async create(data: CreateWorkoutDto) {
    await this.db.insert(workoutTable).values(data);
  }

  async delete(id: number) {
    await this.db.delete(workoutTable).where(eq(workoutTable.id, id));
  }

  async update(id: number, data: UpdateWorkoutDto) {
    await this.db.update(workoutTable).set(data).where(eq(workoutTable.id, id));
  }

  async addExercise(
    workoutId: number,
    exerciseId: number,
    body: UpdateWorkoutExerciseDto,
  ) {
    await this.db
      .insert(workoutExerciseTable)
      .values({ workoutId, exerciseId, ...body });
  }

  async getExercises(workoutId: number) {
    return await this.db
      .select()
      .from(workoutExerciseTable)
      .where(eq(workoutExerciseTable.workoutId, workoutId));
  }

  async updateExercise(
    workoutExerciseId: number,
    body: UpdateWorkoutExerciseDto,
  ) {
    await this.db
      .update(workoutExerciseTable)
      .set(body)
      .where(eq(workoutExerciseTable.id, workoutExerciseId));
  }

  async removeExercise(workoutExerciseId: number) {
    await this.db
      .delete(workoutExerciseTable)
      .where(eq(workoutExerciseTable.id, workoutExerciseId));
  }
}
