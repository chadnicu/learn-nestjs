import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutDto } from './create-workout.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  date?: string;

  @ApiPropertyOptional()
  started?: string;

  @ApiPropertyOptional()
  finished?: string;

  @ApiPropertyOptional()
  comment?: string;

  @ApiPropertyOptional()
  userId?: string;
}
