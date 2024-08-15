import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateWorkoutExerciseDto } from './create-workout-exercise.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateWorkoutExerciseDto extends PartialType(
  CreateWorkoutExerciseDto,
) {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly exerciseId?: number;
}
