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

@Controller('templates')
export class TemplateSetsController {
  constructor(private readonly templateSetsService: TemplateSetsService) {}

  @Post('sets')
  create(@Body() body: CreateTemplateSetDto) {
    return this.templateSetsService.create(body);
  }

  @Get('exercises/:id/sets')
  findAllByTemplateExerciseId(@Param() { id }: NumberIdParamDto) {
    return this.templateSetsService.findAllByTemplateExerciseId(id);
  }

  @Patch('sets/:id')
  update(
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateTemplateSetDto,
  ) {
    return this.templateSetsService.update(id, body);
  }

  @Delete('sets/:id')
  delete(@Param() { id }: NumberIdParamDto) {
    return this.templateSetsService.delete(id);
  }
}
