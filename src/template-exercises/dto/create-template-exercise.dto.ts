import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTemplateExerciseDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly toDo?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly order?: number;
}
