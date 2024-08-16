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

  @Post('sets')
  create(@Body() body: CreateWorkoutSetDto) {
    return this.workoutSetsService.create(body);
  }

  @Get('exercises/:id/sets')
  findAllByWorkoutExerciseId(@Param() { id }: NumberIdParamDto) {
    return this.workoutSetsService.findAllByWorkoutExerciseId(id);
  }

  @Patch('sets/:id')
  update(@Param() { id }: NumberIdParamDto, @Body() body: UpdateWorkoutSetDto) {
    return this.workoutSetsService.update(id, body);
  }

  @Delete('sets/:id')
  delete(@Param() { id }: NumberIdParamDto) {
    return this.workoutSetsService.delete(id);
  }
}
