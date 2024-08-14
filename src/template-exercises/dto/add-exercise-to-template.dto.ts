import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class AddExerciseToTemplateDto {
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  templateId: number;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  exerciseId: number;
}
