import { PartialType } from '@nestjs/swagger';
import { CreateTemplateSetDto } from './create-template-set.dto';

export class UpdateTemplateSetDto extends PartialType(CreateTemplateSetDto) {}
