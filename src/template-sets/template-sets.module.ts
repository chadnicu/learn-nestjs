import { Module } from '@nestjs/common';
import { TemplateSetsService } from './template-sets.service';
import { TemplateSetsController } from './template-sets.controller';
import { TemplateExercisesModule } from '../template-exercises/template-exercises.module';

@Module({
  imports: [TemplateExercisesModule],
  providers: [TemplateSetsService],
  controllers: [TemplateSetsController],
  exports: [TemplateSetsService],
})
export class TemplateSetsModule {}
