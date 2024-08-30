import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Database, DrizzleAsyncProvider } from '../db/db.module';
import {
  AddExerciseToWorkoutDto,
  CreateWorkoutExerciseDto,
  UpdateWorkoutExerciseDto,
} from './dto';
import {
  exerciseTable,
  workoutExerciseTable,
  workoutTable,
} from '../db/schema';
import { and, eq } from 'drizzle-orm';
import { ExercisesService } from '../exercises/exercises.service';
import { WorkoutsService } from '../workouts/workouts.service';
import { excludeInternalFields } from '../common/utils/exclude-fields.util';

@Injectable()
export class WorkoutExercisesService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: Database,
    private exercisesService: ExercisesService,
    private workoutsService: WorkoutsService,
  ) {}

  async create(
    data: AddExerciseToWorkoutDto & CreateWorkoutExerciseDto,
    userId: number,
  ) {
    // Just to check they both belong to user
    await Promise.all([
      this.exercisesService.find(data.exerciseId, userId),
      this.workoutsService.find(data.workoutId, userId),
    ]);

    const [created] = await this.db
      .insert(workoutExerciseTable)
      .values(data)
      .returning();

    return created;
  }

  async findAllByUser(workoutId: number, userId: number) {
    const workoutExercises = await this.db
      .select(excludeInternalFields(workoutExerciseTable))
      .from(workoutExerciseTable)
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
          eq(workoutExerciseTable.workoutId, workoutId),
          eq(workoutTable.userId, userId),
          eq(exerciseTable.userId, userId),
        ),
      );

    return workoutExercises;
  }

  async findOne(id: number, userId: number) {
    const [found] = await this.db
      .select(excludeInternalFields(workoutExerciseTable))
      .from(workoutExerciseTable)
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
          eq(workoutExerciseTable.id, id),
          eq(workoutTable.userId, userId),
          eq(exerciseTable.userId, userId),
        ),
      );

    if (!found)
      throw new NotFoundException(
        `Workout_Exercise with id #${id} not found or not accessible`,
      );

    return found;
  }

  async update(
    id: number,
    data: UpdateWorkoutExerciseDto & { userId: number },
  ) {
    const { userId, ...values } = data;

    // Just to check they all belong to user
    await Promise.all([
      this.findOne(id, userId),
      this.exercisesService.find(data.exerciseId, userId),
      this.workoutsService.find(data.workoutId, userId),
    ]);

    const [updated] = await this.db
      .update(workoutExerciseTable)
      .set(values)
      .where(eq(workoutExerciseTable.id, id))
      .returning();

    if (!updated)
      throw new NotFoundException(
        `Workout_Exercise with id #${id} not found or not accessible`,
      );

    return updated;
  }

  async delete(id: number, userId: number) {
    // Just to check it belongs to user
    await this.findOne(id, userId);

    const [deleted] = await this.db
      .delete(workoutExerciseTable)
      .where(eq(workoutExerciseTable.id, id))
      .returning();

    if (!deleted)
      throw new NotFoundException(
        `Workout_Exercise with id #${id} not found or not accessible`,
      );

    return deleted;
  }
}
