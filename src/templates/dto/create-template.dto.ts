import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly description?: string;
}
