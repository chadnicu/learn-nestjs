import { Module } from '@nestjs/common';
import { TemplateExercisesService } from './template-exercises.service';
import { TemplateExercisesController } from './template-exercises.controller';
import { ExercisesModule } from '../exercises/exercises.module';
import { TemplatesModule } from '../templates/templates.module';

@Module({
  imports: [ExercisesModule, TemplatesModule],
  providers: [TemplateExercisesService],
  controllers: [TemplateExercisesController],
  exports: [TemplateExercisesService],
})
export class TemplateExercisesModule {}
