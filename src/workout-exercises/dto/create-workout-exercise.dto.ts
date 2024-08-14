import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWorkoutExerciseDto {
  @IsNumber()
  @ApiProperty()
  readonly exerciseId: number;

  @IsNumber()
  @ApiProperty()
  readonly workoutId: number;

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
