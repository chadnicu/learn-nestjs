import { IsOptional, IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly instructions?: string;

  @IsOptional()
  @IsString()
  readonly url?: string;

  @IsString()
  readonly userId: string;
}
