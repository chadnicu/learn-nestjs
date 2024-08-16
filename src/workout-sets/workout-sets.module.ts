import { Module } from '@nestjs/common';
import { WorkoutSetsService } from './workout-sets.service';
import { WorkoutSetsController } from './workout-sets.controller';

@Module({
  providers: [WorkoutSetsService],
  controllers: [WorkoutSetsController],
})
export class WorkoutSetsModule {}
