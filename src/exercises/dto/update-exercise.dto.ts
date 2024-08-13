import { CreateExerciseDto } from './create-exericse.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {}
