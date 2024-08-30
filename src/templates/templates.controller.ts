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
import { NumberIdParamDto } from '../common/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetPayload } from 'src/auth/auth.decorator';

@ApiBearerAuth('access-token')
@ApiTags('templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  create(@GetPayload('sub') userId: number, @Body() body: CreateTemplateDto) {
    return this.templatesService.create({ ...body, userId });
  }

  @Get()
  findAllByUser(@GetPayload('sub') userId: number) {
    return this.templatesService.findAllByUser(userId);
  }

  @Get(':id')
  find(@GetPayload('sub') userId: number, @Param() { id }: NumberIdParamDto) {
    return this.templatesService.find(id, userId);
  }

  @Patch(':id')
  update(
    @GetPayload('sub') userId: number,
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateTemplateDto,
  ) {
    return this.templatesService.update(id, { ...body, userId });
  }

  @Delete(':id')
  delete(@GetPayload('sub') userId: number, @Param() { id }: NumberIdParamDto) {
    return this.templatesService.delete(id, userId);
  }
}
