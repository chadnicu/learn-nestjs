import { Module } from '@nestjs/common';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { TemplatesModule } from './templates/templates.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './db/db.module';
import { TemplateExercisesModule } from './template-exercises/template-exercises.module';
import { WorkoutExercisesModule } from './workout-exercises/workout-exercises.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { WorkoutSetsModule } from './workout-sets/workout-sets.module';
import { TemplateSetsModule } from './template-sets/template-sets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ExercisesModule,
    WorkoutsModule,
    TemplatesModule,
    AuthModule,
    UsersModule,
    TemplateExercisesModule,
    WorkoutExercisesModule,
    WorkoutSetsModule,
    TemplateSetsModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
