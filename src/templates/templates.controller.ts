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
import { CreateTemplateDto } from 'src/dto/templates/create-template.dto';
import { UpdateTemplateDto } from 'src/dto/templates/update-template.dto';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get('/user/:id')
  async findAllByUser(@Param('id') userId: string) {
    return await this.templatesService.findAllByUser(userId);
  }

  @Post()
  async create(@Body() body: CreateTemplateDto) {
    await this.templatesService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.templatesService.delete(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTemplateDto) {
    await this.templatesService.update(+id, body);
  }
}
