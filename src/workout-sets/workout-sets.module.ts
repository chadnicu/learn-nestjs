import { Module } from '@nestjs/common';
import { WorkoutSetsService } from './workout-sets.service';
import { WorkoutSetsController } from './workout-sets.controller';
import { WorkoutExercisesModule } from '../workout-exercises/workout-exercises.module';

@Module({
  imports: [WorkoutExercisesModule],
  providers: [WorkoutSetsService],
  controllers: [WorkoutSetsController],
  exports: [WorkoutSetsService],
})
export class WorkoutSetsModule {}
