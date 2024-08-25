import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { workoutTable } from 'src/db/schema';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';

@Injectable()
export class WorkoutsService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async create(data: CreateWorkoutDto & { userId: number }) {
    const [created] = await this.db
      .insert(workoutTable)
      .values(data)
      .returning();

    return created;
  }

  async find(id: number, userId: number) {
    const [workout] = await this.db
      .select()
      .from(workoutTable)
      .where(and(eq(workoutTable.id, id), eq(workoutTable.userId, userId)));

    if (!workout)
      throw new NotFoundException(
        `Workout with id #${id} not found or not accessible`,
      );

    return workout;
  }

  findAllByUser(userId: number) {
    const workouts = this.db
      .select()
      .from(workoutTable)
      .where(eq(workoutTable.userId, userId));

    return workouts;
  }

  async update(id: number, data: UpdateWorkoutDto) {
    const { userId, ...values } = data;

    const [updated] = await this.db
      .update(workoutTable)
      .set(values)
      .where(and(eq(workoutTable.id, id), eq(workoutTable.userId, userId)))
      .returning();

    if (!updated)
      throw new NotFoundException(
        `Workout with id #${id} not found or not accessible`,
      );

    return updated;
  }

  async delete(id: number, userId: number) {
    const [deleted] = await this.db
      .delete(workoutTable)
      .where(and(eq(workoutTable.id, id), eq(workoutTable.userId, userId)))
      .returning();

    if (!deleted)
      throw new NotFoundException(
        `Workout with id #${id} not found or not accessible`,
      );

    return deleted;
  }
}
