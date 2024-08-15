import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { workoutTable } from 'src/db/schema';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';

@Injectable()
export class WorkoutsService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async create(data: CreateWorkoutDto) {
    const [created] = await this.db
      .insert(workoutTable)
      .values(data)
      .returning();

    return created;
  }

  async find(id: number) {
    const [workout] = await this.db
      .select()
      .from(workoutTable)
      .where(eq(workoutTable.id, id));

    if (!workout)
      throw new NotFoundException(`Workout with id #${id} not found`);

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
    const [updated] = await this.db
      .update(workoutTable)
      .set(data)
      .where(eq(workoutTable.id, id))
      .returning();

    if (!updated)
      throw new NotFoundException(`Workout with id #${id} not found`);

    return updated;
  }

  async delete(id: number) {
    const [deleted] = await this.db
      .delete(workoutTable)
      .where(eq(workoutTable.id, id))
      .returning();

    if (!deleted)
      throw new NotFoundException(`Workout with id #${id} not found`);

    return deleted;
  }
}
