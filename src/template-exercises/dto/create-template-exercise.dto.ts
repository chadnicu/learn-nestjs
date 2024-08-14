import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTemplateExerciseDto {
  @IsNumber()
  @ApiProperty()
  readonly exerciseId: number;

  @IsNumber()
  @ApiProperty()
  readonly templateId: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly toDo?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly order?: number;
}
