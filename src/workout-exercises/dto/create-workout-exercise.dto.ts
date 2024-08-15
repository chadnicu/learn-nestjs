import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWorkoutExerciseDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly toDo?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly comment?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly order?: number;
}
