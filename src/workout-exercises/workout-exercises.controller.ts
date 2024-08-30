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
import { NumberIdParamDto } from '../common/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetPayload } from '../auth/auth.decorator';

@ApiBearerAuth('access-token')
@ApiTags('workout-exercises')
@Controller('workouts')
export class WorkoutExercisesController {
  constructor(
    private readonly workoutExercisesService: WorkoutExercisesService,
  ) {}

  @Post(':workoutId/exercises/:exerciseId')
  create(
    @GetPayload('sub') userId: number,
    @Param() ids: AddExerciseToWorkoutDto,
    @Body() body: CreateWorkoutExerciseDto,
  ) {
    return this.workoutExercisesService.create({ ...ids, ...body }, userId);
  }

  @Get(':id/exercises')
  findAllByUser(
    @GetPayload('sub') userId: number,
    @Param() { id: workoutId }: NumberIdParamDto,
  ) {
    return this.workoutExercisesService.findAllByUser(workoutId, userId);
  }

  @Patch('exercises/:id')
  update(
    @GetPayload('sub') userId: number,
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateWorkoutExerciseDto,
  ) {
    return this.workoutExercisesService.update(id, { ...body, userId });
  }

  @Delete('exercises/:id')
  delete(@GetPayload('sub') userId: number, @Param() { id }: NumberIdParamDto) {
    return this.workoutExercisesService.delete(id, userId);
  }
}
