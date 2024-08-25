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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetPayload } from 'src/auth/auth.decorator';

@ApiBearerAuth('access-token')
@ApiTags('exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(@GetPayload('sub') userId: number, @Body() body: CreateExerciseDto) {
    return this.exercisesService.create({ ...body, userId });
  }

  @Get(':id')
  find(@GetPayload('sub') userId: number, @Param() { id }: NumberIdParamDto) {
    return this.exercisesService.find(id, userId);
  }

  @Get()
  findAllByUser(@GetPayload('sub') userId: number) {
    return this.exercisesService.findAllByUser(userId);
  }

  @Patch(':id')
  update(
    @GetPayload('sub') userId: number,
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateExerciseDto,
  ) {
    return this.exercisesService.update(id, { ...body, userId });
  }

  @Delete(':id')
  delete(@GetPayload('sub') userId: number, @Param() { id }: NumberIdParamDto) {
    return this.exercisesService.delete(id, userId);
  }
}
