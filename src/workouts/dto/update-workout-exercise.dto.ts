import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateWorkoutExerciseDto } from './create-workout-exercise.dto';

export class UpdateWorkoutExerciseDto extends PartialType(
  CreateWorkoutExerciseDto,
) {
  @ApiPropertyOptional()
  readonly exerciseId?: number;

  @ApiPropertyOptional()
  readonly workoutId: number;

  @ApiPropertyOptional()
  readonly toDo?: string;

  @ApiPropertyOptional()
  readonly comment?: string;

  @ApiPropertyOptional()
  readonly order?: number;
}
