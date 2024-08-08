import { IsOptional, IsString } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsString()
  readonly userId: string;
}
