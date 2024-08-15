import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import {
  AddExerciseToWorkoutDto,
  CreateWorkoutExerciseDto,
  UpdateWorkoutExerciseDto,
} from './dto';
import { workoutExerciseTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class WorkoutExercisesService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async create(data: AddExerciseToWorkoutDto & CreateWorkoutExerciseDto) {
    const [created] = await this.db
      .insert(workoutExerciseTable)
      .values(data)
      .returning();

    return created;
  }

  findAll(workoutId: number) {
    const exercises = this.db
      .select()
      .from(workoutExerciseTable)
      .where(eq(workoutExerciseTable.workoutId, workoutId));

    return exercises;
  }

  async update(id: number, body: UpdateWorkoutExerciseDto) {
    const [updated] = await this.db
      .update(workoutExerciseTable)
      .set(body)
      .where(eq(workoutExerciseTable.id, id))
      .returning();

    if (!updated)
      throw new NotFoundException(`Workout_Exercise with id #${id} not found`);

    return updated;
  }

  async delete(id: number) {
    const [deleted] = await this.db
      .delete(workoutExerciseTable)
      .where(eq(workoutExerciseTable.id, id))
      .returning();

    if (!deleted)
      throw new NotFoundException(`Workout_Exercise with id #${id} not found`);

    return deleted;
  }
}
