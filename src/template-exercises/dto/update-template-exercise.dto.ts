import { PartialType } from '@nestjs/swagger';
import { CreateTemplateExerciseDto } from './create-template-exercise.dto';

export class UpdateTemplateExerciseDto extends PartialType(
  CreateTemplateExerciseDto,
) {}
