import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateTemplateSetDto {
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
}
