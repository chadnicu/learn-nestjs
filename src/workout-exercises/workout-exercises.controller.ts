import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WorkoutExercisesService } from './workout-exercises.service';
import {
  AddExerciseToWorkoutDto,
  CreateWorkoutExerciseDto,
  UpdateWorkoutExerciseDto,
} from './dto';
import { NumberIdParamDto } from 'src/common/dto';

@Controller('workouts')
export class WorkoutExercisesController {
  constructor(
    private readonly workoutExercisesService: WorkoutExercisesService,
  ) {}

  @Post(':workoutId/exercises/:exerciseId')
  create(
    @Param() ids: AddExerciseToWorkoutDto,
    @Body() body: CreateWorkoutExerciseDto,
  ) {
    return this.workoutExercisesService.create({ ...ids, ...body });
  }

  @Get(':id/exercises')
  findAll(@Param() { id: workoutId }: NumberIdParamDto) {
    return this.workoutExercisesService.findAll(workoutId);
  }

  @Patch('/exercises/:id')
  update(
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateWorkoutExerciseDto,
  ) {
    return this.workoutExercisesService.update(id, body);
  }

  @Delete('/exercises/:id')
  delete(@Param() { id }: NumberIdParamDto) {
    return this.workoutExercisesService.delete(id);
  }
}
