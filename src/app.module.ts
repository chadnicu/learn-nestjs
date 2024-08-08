import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './exercises/exercises.module';
// import { ConfigModule } from '@nestjs/config';
import { WorkoutsModule } from './workouts/workouts.module';
import { TemplatesModule } from './templates/templates.module';
// import * as Joi from 'joi';

@Module({
  imports: [
    ExercisesModule,
    WorkoutsModule,
    TemplatesModule,
    // ConfigModule.forRoot({
    //   validationSchema: Joi.object({
    //     POSTGRES_HOST: Joi.string().required(),
    //     POSTGRES_PORT: Joi.number().required(),
    //     POSTGRES_USER: Joi.string().required(),
    //     POSTGRES_PASSWORD: Joi.string().required(),
    //     POSTGRES_DB: Joi.string().required(),
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
