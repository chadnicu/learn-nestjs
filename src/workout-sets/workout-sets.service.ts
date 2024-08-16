import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { CreateWorkoutSetDto, UpdateWorkoutSetDto } from './dto';
import { workoutSetTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class WorkoutSetsService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async create(body: CreateWorkoutSetDto) {
    const [created] = await this.db
      .insert(workoutSetTable)
      .values(body)
      .returning();

    return created;
  }

  // not sure if I'll ever need to find just one
  findAllByWorkoutExerciseId(workoutExerciseId: number) {
    const sets = this.db
      .select()
      .from(workoutSetTable)
      .where(eq(workoutSetTable.workoutExerciseId, workoutExerciseId));

    return sets;
  }

  async update(id: number, data: UpdateWorkoutSetDto) {
    const [updated] = await this.db
      .update(workoutSetTable)
      .set(data)
      .where(eq(workoutSetTable.id, id))
      .returning();

    if (!updated)
      throw new NotFoundException(`Workout_Set with id #${id} not found`);

    return updated;
  }

  async delete(id: number) {
    const [deleted] = await this.db
      .delete(workoutSetTable)
      .where(eq(workoutSetTable.id, id))
      .returning();

    if (!deleted)
      throw new NotFoundException(`Workout_Set with id #${id} not found`);

    return deleted;
  }
}
