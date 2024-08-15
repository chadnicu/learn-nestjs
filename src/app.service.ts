import { Inject, Injectable } from '@nestjs/common';
import { Database, DrizzleAsyncProvider } from './db/db.module';
import {
  exerciseTable,
  templateExerciseTable,
  templateSetTable,
  templateTable,
  userTable,
  workoutExerciseTable,
  workoutSetTable,
  workoutTable,
} from './db/schema';

@Injectable()
export class AppService {
  constructor(@Inject(DrizzleAsyncProvider) private db: Database) {}

  async getAllData() {
    const [
      users,
      exercises,
      templates,
      templateExercises,
      workouts,
      workoutExercises,
      workoutSets,
      templateSets,
    ] = await Promise.all([
      this.db.select().from(userTable).all(),
      this.db.select().from(exerciseTable).all(),
      this.db.select().from(templateTable).all(),
      this.db.select().from(templateExerciseTable).all(),
      this.db.select().from(workoutTable).all(),
      this.db.select().from(workoutExerciseTable).all(),
      this.db.select().from(workoutSetTable).all(),
      this.db.select().from(templateSetTable).all(),
    ]);

    return {
      users,
      exercises,
      templates,
      templateExercises,
      workouts,
      workoutExercises,
      workoutSets,
      templateSets,
    };
  }

  async deleteAllData() {
    await Promise.all([
      this.db.delete(templateSetTable).all(),
      this.db.delete(workoutSetTable).all(),
    ]);

    await Promise.all([
      this.db.delete(templateExerciseTable).all(),
      this.db.delete(workoutExerciseTable).all(),
    ]);

    await Promise.all([
      this.db.delete(templateTable).all(),
      this.db.delete(workoutTable).all(),
      this.db.delete(exerciseTable).all(),
    ]);

    await this.db.delete(userTable).all();

    return 'Deleted all rows';
    /* 
    -- if you need to drop the tables too:

    DROP TABLE IF EXISTS template_set;
    DROP TABLE IF EXISTS workout_set;
   
    DROP TABLE IF EXISTS template_exercise;
    DROP TABLE IF EXISTS workout_exercise;
    
    DROP TABLE IF EXISTS template;
    DROP TABLE IF EXISTS workout;
    DROP TABLE IF EXISTS exercise;
    
    DROP TABLE IF EXISTS user;
    */
  }
}
