import { Module } from '@nestjs/common';
import { TemplateExercisesService } from './template-exercises.service';
import { TemplateExercisesController } from './template-exercises.controller';
import { ExercisesModule } from 'src/exercises/exercises.module';
import { TemplatesModule } from 'src/templates/templates.module';

@Module({
  imports: [ExercisesModule, TemplatesModule],
  providers: [TemplateExercisesService],
  controllers: [TemplateExercisesController],
  exports: [TemplateExercisesService],
})
export class TemplateExercisesModule {}
