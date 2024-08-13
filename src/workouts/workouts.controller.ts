import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import {
  CreateWorkoutDto,
  UpdateWorkoutDto,
  UpdateWorkoutExerciseDto,
} from './dto';
import { AddExerciseToWorkoutDto } from './dto/add-exercise-to-workout.dto';
import { NumberIdParamDto } from 'src/common/number-id-param.dto';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get('/user/:id')
  async findAllByUser(@Param() { id: userId }: NumberIdParamDto) {
    return await this.workoutsService.findAllByUser(userId);
  }

  @Get(':id')
  async find(@Param() { id }: NumberIdParamDto) {
    return await this.workoutsService.find(id);
  }

  @Post()
  async create(@Body() body: CreateWorkoutDto) {
    await this.workoutsService.create(body);
  }

  @Delete(':id')
  async delete(@Param() { id }: NumberIdParamDto) {
    console.log('id ', id);
    await this.workoutsService.delete(id);
  }

  @Patch(':id')
  async update(
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateWorkoutDto,
  ) {
    await this.workoutsService.update(id, body);
  }

  @Get(':id/exercises')
  async getExercises(@Param() { id }: NumberIdParamDto) {
    return await this.workoutsService.getExercises(id);
  }

  @Post(':workoutId/exercises/:exerciseId')
  async addExercise(
    @Param() { workoutId, exerciseId }: AddExerciseToWorkoutDto,
    @Body() body: UpdateWorkoutExerciseDto,
  ) {
    await this.workoutsService.addExercise(workoutId, exerciseId, body);
  }

  @Patch('/exercises/:id')
  async updateExercise(
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateWorkoutExerciseDto,
  ) {
    await this.workoutsService.updateExercise(id, body);
  }

  @Delete('/exercises/:id')
  async removeExercise(@Param() { id }: NumberIdParamDto) {
    await this.workoutsService.removeExercise(id);
  }
}
