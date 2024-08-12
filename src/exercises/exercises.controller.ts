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
import { StringIdParamDto } from 'src/common/string-id-param.dto';
import { NumberIdParamDto } from 'src/common/number-id-param.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get('/user/:id')
  async findAllByUser(@Param() { id: userId }: StringIdParamDto) {
    return await this.exercisesService.findAllByUser(userId);
  }

  @Post()
  async create(@Body() body: CreateExerciseDto) {
    await this.exercisesService.create(body);
  }

  @Delete(':id')
  async delete(@Param() { id }: NumberIdParamDto) {
    await this.exercisesService.delete(id);
  }

  @Patch(':id')
  async update(
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateExerciseDto,
  ) {
    await this.exercisesService.update(id, body);
  }
}
