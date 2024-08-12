import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddExerciseToWorkout {
  @IsNumber()
  @ApiProperty()
  workoutId: number;

  @IsNumber()
  @ApiProperty()
  exerciseId: number;
}
