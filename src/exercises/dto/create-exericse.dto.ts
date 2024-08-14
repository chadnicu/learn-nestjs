import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly instructions?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly url?: string;

  @IsNumber()
  @ApiProperty()
  readonly userId: number;
}
