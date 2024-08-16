import { Module } from '@nestjs/common';
import { TemplateSetsService } from './template-sets.service';
import { TemplateSetsController } from './template-sets.controller';

@Module({
  providers: [TemplateSetsService],
  controllers: [TemplateSetsController],
})
export class TemplateSetsModule {}
