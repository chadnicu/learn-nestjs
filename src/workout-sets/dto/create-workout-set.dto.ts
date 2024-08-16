import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWorkoutSetDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  reps?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  weight?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  rir?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  comment?: string;

  @IsNumber()
  @ApiProperty()
  workoutExerciseId: number;
}
