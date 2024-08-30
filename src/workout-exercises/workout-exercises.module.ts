import { Module } from '@nestjs/common';
import { WorkoutExercisesService } from './workout-exercises.service';
import { WorkoutExercisesController } from './workout-exercises.controller';
import { ExercisesModule } from '../exercises/exercises.module';
import { WorkoutsModule } from '../workouts/workouts.module';

@Module({
  imports: [ExercisesModule, WorkoutsModule],
  providers: [WorkoutExercisesService],
  controllers: [WorkoutExercisesController],
  exports: [WorkoutExercisesService],
})
export class WorkoutExercisesModule {}
