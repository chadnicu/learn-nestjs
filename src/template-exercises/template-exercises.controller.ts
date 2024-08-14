import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddExerciseToTemplateDto, UpdateTemplateExerciseDto } from './dto';
import { TemplateExercisesService } from './template-exercises.service';
import { NumberIdParamDto } from 'src/common/dto';

@Controller('templates')
export class TemplateExercisesController {
  constructor(
    private readonly templateExercisesService: TemplateExercisesService,
  ) {}

  @Post(':templateId/exercises/:exerciseId')
  create(
    @Param() ids: AddExerciseToTemplateDto,
    @Body() body: UpdateTemplateExerciseDto,
  ) {
    return this.templateExercisesService.create({ ...ids, ...body });
  }

  @Get(':id/exercises')
  findAll(@Param() { id: templateId }: NumberIdParamDto) {
    return this.templateExercisesService.findAll(templateId);
  }

  @Patch('/exercises/:id')
  update(
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateTemplateExerciseDto,
  ) {
    return this.templateExercisesService.update(id, body);
  }

  @Delete('/exercises/:id')
  delete(@Param() { id }: NumberIdParamDto) {
    return this.templateExercisesService.delete(id);
  }
}
