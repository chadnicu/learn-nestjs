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
import { NumberIdParamDto } from '../common/dto';
import { CreateTemplateSetDto, UpdateTemplateSetDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetPayload } from 'src/auth/auth.decorator';

@ApiBearerAuth('access-token')
@ApiTags('template-sets')
@Controller('templates')
export class TemplateSetsController {
  constructor(private readonly templateSetsService: TemplateSetsService) {}

  @Post('exercises/:id/sets')
  create(
    @GetPayload('sub') userId: number,
    @Param() { id: templateExerciseId }: NumberIdParamDto,
    @Body() body: CreateTemplateSetDto,
  ) {
    return this.templateSetsService.create({
      ...body,
      templateExerciseId,
      userId,
    });
  }

  @Get('exercises/:id/sets')
  findAllByTemplateExerciseId(
    @GetPayload('sub') userId: number,
    @Param() { id }: NumberIdParamDto,
  ) {
    return this.templateSetsService.findAllByTemplateExerciseId(id, userId);
  }

  @Patch('exercises/sets/:id')
  update(
    @GetPayload('sub') userId: number,
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateTemplateSetDto,
  ) {
    return this.templateSetsService.update(id, { ...body, userId });
  }

  @Delete('exercises/sets/:id')
  delete(@GetPayload('sub') userId: number, @Param() { id }: NumberIdParamDto) {
    return this.templateSetsService.delete(id, userId);
  }
}
