import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTemplateExerciseDto } from './create-template-exercise.dto';

export class UpdateTemplateExerciseDto extends PartialType(
  CreateTemplateExerciseDto,
) {
  @ApiPropertyOptional()
  readonly exerciseId?: number;

  @ApiPropertyOptional()
  readonly templateId?: number;

  @ApiPropertyOptional()
  readonly toDo?: string;

  @ApiPropertyOptional()
  readonly order?: number;
}
