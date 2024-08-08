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
import { CreateWorkoutDto } from 'src/dto/workouts/create-workout.dto';
import { UpdateWorkoutDto } from 'src/dto/workouts/update-workout.dto';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get('/user/:id')
  async findAllByUser(@Param('id') userId: string) {
    return await this.workoutsService.findAllByUser(userId);
  }

  @Post()
  async create(@Body() body: CreateWorkoutDto) {
    await this.workoutsService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.workoutsService.delete(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateWorkoutDto) {
    await this.workoutsService.update(+id, body);
  }
}
