import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto, UpdateTemplateDto } from './dto';
import { NumberIdParamDto } from 'src/common/number-id-param.dto';
import { AddExerciseToTemplateDto } from './dto/add-exercise-to-template.dto';
import { UpdateTemplateExerciseDto } from './dto/update-template-exercise.dto';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get('/user/:id')
  async findAllByUser(@Param() { id: userId }: NumberIdParamDto) {
    return await this.templatesService.findAllByUser(userId);
  }

  @Get(':id')
  async find(@Param() { id }: NumberIdParamDto) {
    return await this.templatesService.find(id);
  }

  @Post()
  async create(@Body() body: CreateTemplateDto) {
    await this.templatesService.create(body);
  }

  @Delete(':id')
  async delete(@Param() { id }: NumberIdParamDto) {
    await this.templatesService.delete(id);
  }

  @Patch(':id')
  async update(
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateTemplateDto,
  ) {
    await this.templatesService.update(id, body);
  }

  @Get(':id/exercises')
  async getExercises(@Param() { id }: NumberIdParamDto) {
    return await this.templatesService.getExercises(id);
  }

  @Post(':templateId/exercises/:exerciseId')
  async addExercise(
    @Param() { templateId, exerciseId }: AddExerciseToTemplateDto,
    @Body() body: UpdateTemplateExerciseDto,
  ) {
    await this.templatesService.addExercise(templateId, exerciseId, body);
  }

  @Patch('/exercises/:id')
  async updateExercise(
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateTemplateExerciseDto,
  ) {
    await this.templatesService.updateExercise(id, body);
  }

  @Delete('/exercises/:id')
  async removeExercise(@Param() { id }: NumberIdParamDto) {
    await this.templatesService.removeExercise(id);
  }
}
