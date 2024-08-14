import { Module } from '@nestjs/common';
import { TemplateExercisesService } from './template-exercises.service';
import { TemplateExercisesController } from './template-exercises.controller';

@Module({
  providers: [TemplateExercisesService],
  controllers: [TemplateExercisesController],
})
export class TemplateExercisesModule {}
