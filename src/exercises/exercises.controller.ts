import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from 'src/dto/exercises/create-exericse.dto';
import { UpdateExerciseDto } from 'src/dto/exercises/update-exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get('/user/:id')
  async findAllByUser(@Param('id') userId: string) {
    return await this.exercisesService.findAllByUser(userId);
  }

  @Post()
  async create(@Body() body: CreateExerciseDto) {
    await this.exercisesService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.exercisesService.delete(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateExerciseDto) {
    await this.exercisesService.update(+id, body);
  }
}
