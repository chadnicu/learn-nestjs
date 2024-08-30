import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  AddExerciseToTemplateDto,
  CreateTemplateExerciseDto,
  UpdateTemplateExerciseDto,
} from './dto';
import { TemplateExercisesService } from './template-exercises.service';
import { NumberIdParamDto } from '../common/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetPayload } from 'src/auth/auth.decorator';

@ApiBearerAuth('access-token')
@ApiTags('template-exercises')
@Controller('templates')
export class TemplateExercisesController {
  constructor(
    private readonly templateExercisesService: TemplateExercisesService,
  ) {}

  @Post(':templateId/exercises/:exerciseId')
  create(
    @GetPayload('sub') userId: number,
    @Param() ids: AddExerciseToTemplateDto,
    @Body() body: CreateTemplateExerciseDto,
  ) {
    return this.templateExercisesService.create({ ...ids, ...body }, userId);
  }

  @Get(':id/exercises')
  findAllByUser(
    @GetPayload('sub') userId: number,
    @Param() { id: templateId }: NumberIdParamDto,
  ) {
    return this.templateExercisesService.findAllByUser(templateId, userId);
  }

  @Patch('exercises/:id')
  update(
    @GetPayload('sub') userId: number,
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateTemplateExerciseDto,
  ) {
    return this.templateExercisesService.update(id, { ...body, userId });
  }

  @Delete('exercises/:id')
  delete(@GetPayload('sub') userId: number, @Param() { id }: NumberIdParamDto) {
    return this.templateExercisesService.delete(id, userId);
  }
}
