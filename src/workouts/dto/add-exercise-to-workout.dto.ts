import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class AddExerciseToWorkoutDto {
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  workoutId: number;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  exerciseId: number;
}
