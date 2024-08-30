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
import { NumberIdParamDto } from '../common/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetPayload } from '../auth/auth.decorator';

@ApiBearerAuth('access-token')
@ApiTags('workout-sets')
@Controller('workouts')
export class WorkoutSetsController {
  constructor(private readonly workoutSetsService: WorkoutSetsService) {}

  @Post('exercises/:id/sets')
  create(
    @GetPayload('sub') userId: number,
    @Param() { id: workoutExerciseId }: NumberIdParamDto,
    @Body() body: CreateWorkoutSetDto,
  ) {
    return this.workoutSetsService.create({
      ...body,
      workoutExerciseId,
      userId,
    });
  }

  @Get('exercises/:id/sets')
  findAllByWorkoutExerciseId(
    @GetPayload('sub') userId: number,
    @Param() { id }: NumberIdParamDto,
  ) {
    return this.workoutSetsService.findAllByWorkoutExerciseId(id, userId);
  }

  @Patch('exercises/sets/:id')
  update(
    @GetPayload('sub') userId: number,
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateWorkoutSetDto,
  ) {
    return this.workoutSetsService.update(id, { ...body, userId });
  }

  @Delete('exercises/sets/:id')
  delete(@GetPayload('sub') userId: number, @Param() { id }: NumberIdParamDto) {
    return this.workoutSetsService.delete(id, userId);
  }
}
