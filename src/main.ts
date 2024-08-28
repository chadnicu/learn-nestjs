import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './global-filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './global-filters/all-exceptions.filter';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TrainSync')
    .setDescription('Workout tracker app')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
  };
  SwaggerModule.setup('api', app, document, options);

  const configService = app.get(ConfigService);
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost, configService),
    new HttpExceptionFilter(configService),
  );

  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  const usersService = app.get(UsersService);
  app.useGlobalGuards(
    new AuthGuard(jwtService, configService, reflector, usersService),
  );

  await app.listen(3000);
}
bootstrap();
