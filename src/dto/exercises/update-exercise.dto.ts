import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-exericse.dto';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {}
