import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('MenuService');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3001);

  const config = new DocumentBuilder()
    .setTitle('Menu Service')
    .setDescription('Menu Service API for QR Food - Restaurant menu management')
    .setVersion('1.0')
    .addTag('restaurants', 'Restaurant CRUD operations')
    .addTag('categories', 'Category CRUD operations')
    .addTag('menu-items', 'Menu item CRUD operations')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`Menu Service running on http://localhost:${port}/api`);
}

bootstrap();
