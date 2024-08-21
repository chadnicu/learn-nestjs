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
import { NumberIdParamDto } from 'src/common/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  create(@Body() body: CreateTemplateDto) {
    return this.templatesService.create(body);
  }

  @Get(':id')
  find(@Param() { id }: NumberIdParamDto) {
    return this.templatesService.find(id);
  }

  @Get('user/:id')
  findAllByUser(@Param() { id: userId }: NumberIdParamDto) {
    return this.templatesService.findAllByUser(userId);
  }

  @Patch(':id')
  update(@Param() { id }: NumberIdParamDto, @Body() body: UpdateTemplateDto) {
    return this.templatesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param() { id }: NumberIdParamDto) {
    return this.templatesService.delete(id);
  }
}
