import { IsOptional, IsString } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly date?: string;

  @IsOptional()
  @IsString()
  readonly started?: string;

  @IsOptional()
  @IsString()
  readonly finished?: string;

  @IsOptional()
  @IsString()
  readonly comment?: string;

  @IsString()
  readonly userId: string;
}
