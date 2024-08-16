import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WorkoutSetsService } from './workout-sets.service';
import { CreateWorkoutSetDto, UpdateWorkoutSetDto } from './dto';
import { NumberIdParamDto } from 'src/common/dto';

@Controller('workouts')
export class WorkoutSetsController {
  constructor(private readonly workoutSetsService: WorkoutSetsService) {}

  @Post('exercises/:id/sets')
  create(
    @Param() { id: workoutExerciseId }: NumberIdParamDto,
    @Body() body: CreateWorkoutSetDto,
  ) {
    return this.workoutSetsService.create({ ...body, workoutExerciseId });
  }

  @Get('exercises/:id/sets')
  findAllByWorkoutExerciseId(@Param() { id }: NumberIdParamDto) {
    return this.workoutSetsService.findAllByWorkoutExerciseId(id);
  }

  @Patch('exercises/sets/:id')
  update(@Param() { id }: NumberIdParamDto, @Body() body: UpdateWorkoutSetDto) {
    return this.workoutSetsService.update(id, body);
  }

  @Delete('exercises/sets/:id')
  delete(@Param() { id }: NumberIdParamDto) {
    return this.workoutSetsService.delete(id);
  }
}
