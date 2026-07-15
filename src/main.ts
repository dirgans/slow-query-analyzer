import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('NestJS Slow Query Analyzer')
    .setDescription(
      'Weekly Slow Query Analyzer built with NestJS, TypeORM, PostgreSQL, and EventEmitter.',
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const port = Number(process.env.PORT) || 3000;

  await app.listen(port);

  console.log(`
==========================================================
🚀 NestJS Slow Query Analyzer
==========================================================

Application : http://localhost:${port}
Swagger      : http://localhost:${port}/api

==========================================================
`);
}

bootstrap();