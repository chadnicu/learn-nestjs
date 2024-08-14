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
import { CreateExerciseDto, UpdateExerciseDto } from './dto';
import { NumberIdParamDto } from 'src/common/dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(@Body() body: CreateExerciseDto) {
    return this.exercisesService.create(body);
  }

  @Get(':id')
  find(@Param() { id }: NumberIdParamDto) {
    return this.exercisesService.find(id);
  }

  @Get('/user/:id')
  findAllByUser(@Param() { id: userId }: NumberIdParamDto) {
    return this.exercisesService.findAllByUser(userId);
  }

  @Patch(':id')
  update(@Param() { id }: NumberIdParamDto, @Body() body: UpdateExerciseDto) {
    return this.exercisesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param() { id }: NumberIdParamDto) {
    return this.exercisesService.delete(id);
  }
}
