import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Database, DrizzleAsyncProvider } from 'src/db/db.module';
import { workoutTable } from 'src/db/schema';
import { CreateWorkoutDto } from 'src/dto/workouts/create-workout.dto';
import { UpdateWorkoutDto } from 'src/dto/workouts/update-workout.dto';

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
}
