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
import { StringIdParamDto } from 'src/common/string-id-param.dto';
import { NumberIdParamDto } from 'src/common/number-id-param.dto';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get('/user/:id')
  async findAllByUser(@Param() { id: userId }: StringIdParamDto) {
    return await this.templatesService.findAllByUser(userId);
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
}
