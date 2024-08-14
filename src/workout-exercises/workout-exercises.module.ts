import { Module } from '@nestjs/common';
import { WorkoutExercisesService } from './workout-exercises.service';
import { WorkoutExercisesController } from './workout-exercises.controller';

@Module({
  providers: [WorkoutExercisesService],
  controllers: [WorkoutExercisesController],
})
export class WorkoutExercisesModule {}
