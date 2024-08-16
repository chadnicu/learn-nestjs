import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTemplateExerciseDto } from './create-template-exercise.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateTemplateExerciseDto extends PartialType(
  CreateTemplateExerciseDto,
) {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly exerciseId?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly templateId?: number;
}
