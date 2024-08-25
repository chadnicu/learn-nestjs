import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';

@Module({
  imports: [],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
