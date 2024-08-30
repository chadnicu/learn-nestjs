import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Database, DrizzleAsyncProvider } from '../db/db.module';
import { CreateWorkoutSetDto, UpdateWorkoutSetDto } from './dto';
import {
  exerciseTable,
  workoutExerciseTable,
  workoutSetTable,
  workoutTable,
} from '../db/schema';
import { and, eq } from 'drizzle-orm';
import { WorkoutExercisesService } from '../workout-exercises/workout-exercises.service';
import { excludeInternalFields } from '../common/utils/exclude-fields.util';

@Injectable()
export class WorkoutSetsService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: Database,
    private workoutExercisesService: WorkoutExercisesService,
  ) {}

  async create(
    data: CreateWorkoutSetDto & { workoutExerciseId: number; userId: number },
  ) {
    const { userId, ...values } = data;

    // check if it belongs to user
    await this.workoutExercisesService.findOne(data.workoutExerciseId, userId);

    const [created] = await this.db
      .insert(workoutSetTable)
      .values(values)
      .returning();

    return created;
  }

  async findAllByWorkoutExerciseId(workoutExerciseId: number, userId: number) {
    const sets = await this.db
      .select(excludeInternalFields(workoutSetTable))
      .from(workoutSetTable)
      .innerJoin(
        workoutExerciseTable,
        eq(workoutSetTable.workoutExerciseId, workoutExerciseTable.id),
      )
      .innerJoin(
        workoutTable,
        eq(workoutExerciseTable.workoutId, workoutTable.id),
      )
      .innerJoin(
        exerciseTable,
        eq(workoutExerciseTable.exerciseId, exerciseTable.id),
      )
      .where(
        and(
          eq(workoutSetTable.workoutExerciseId, workoutExerciseId),
          eq(workoutExerciseTable.id, workoutExerciseId),
          eq(workoutTable.userId, userId),
          eq(exerciseTable.userId, userId),
        ),
      );

    return sets;
  }

  async findOne(id: number, userId: number) {
    const [found] = await this.db
      .select(excludeInternalFields(workoutSetTable))
      .from(workoutSetTable)
      .innerJoin(
        workoutExerciseTable,
        eq(workoutSetTable.workoutExerciseId, workoutExerciseTable.id),
      )
      .innerJoin(
        exerciseTable,
        eq(workoutExerciseTable.exerciseId, exerciseTable.id),
      )
      .innerJoin(
        workoutTable,
        eq(workoutExerciseTable.workoutId, workoutTable.id),
      )
      .where(
        and(
          eq(workoutSetTable.id, id),
          eq(workoutTable.userId, userId),
          eq(exerciseTable.userId, userId),
        ),
      );

    if (!found)
      throw new NotFoundException(
        `Workout_Set with id #${id} not found or not accessible`,
      );

    return found;
  }

  async update(id: number, data: UpdateWorkoutSetDto & { userId: number }) {
    const { userId, ...values } = data;

    // check if it belongs to user
    await this.findOne(id, userId);

    const [updated] = await this.db
      .update(workoutSetTable)
      // .set(data) eroare
      .set({ ...values, workoutExerciseId: undefined })
      .where(eq(workoutSetTable.id, id))
      .returning();

    if (!updated)
      throw new NotFoundException(
        `Workout_Set with id #${id} not found or not accessible`,
      );

    return updated;
  }

  async delete(id: number, userId: number) {
    // check if it belongs to user
    await this.findOne(id, userId);

    const [deleted] = await this.db
      .delete(workoutSetTable)
      .where(eq(workoutSetTable.id, id))
      .returning();

    if (!deleted)
      throw new NotFoundException(
        `Workout_Set with id #${id} not found or not accessible`,
      );

    return deleted;
  }
}
