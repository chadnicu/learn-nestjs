import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly description?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly date?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly started?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly finished?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly comment?: string;

  @IsString()
  @ApiProperty()
  readonly userId: string;
}
