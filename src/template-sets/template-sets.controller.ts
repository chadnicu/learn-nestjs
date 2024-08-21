import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TemplateSetsService } from './template-sets.service';
import { NumberIdParamDto } from 'src/common/dto';
import { CreateTemplateSetDto, UpdateTemplateSetDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('template-sets')
@Controller('templates')
export class TemplateSetsController {
  constructor(private readonly templateSetsService: TemplateSetsService) {}

  @Post('exercises/:id/sets')
  create(
    @Param() { id: templateExerciseId }: NumberIdParamDto,
    @Body() body: CreateTemplateSetDto,
  ) {
    return this.templateSetsService.create({ ...body, templateExerciseId });
  }

  @Get('exercises/:id/sets')
  findAllByTemplateExerciseId(@Param() { id }: NumberIdParamDto) {
    return this.templateSetsService.findAllByTemplateExerciseId(id);
  }

  @Patch('exercises/sets/:id')
  update(
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateTemplateSetDto,
  ) {
    return this.templateSetsService.update(id, body);
  }

  @Delete('exercises/sets/:id')
  delete(@Param() { id }: NumberIdParamDto) {
    return this.templateSetsService.delete(id);
  }
}
