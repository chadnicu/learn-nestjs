import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-exericse.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
  @ApiPropertyOptional()
  readonly title?: string;

  @ApiPropertyOptional()
  readonly instructions?: string;

  @ApiPropertyOptional()
  readonly url?: string;

  @ApiPropertyOptional()
  readonly userId?: number;
}
