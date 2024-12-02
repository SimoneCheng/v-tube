import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { type NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    logger.log('Starting application...');
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    logger.log('Application created successfully');

    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads/',
    });

    const config = new DocumentBuilder()
      .setTitle('V-Tube API')
      .setDescription('The V-Tube API description')
      .setVersion('1.0')
      .addTag('v-tube')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.get(ConfigService);
    await app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(3000);
    logger.log('Application is listening on port 3000');
  } catch (error) {
    logger.error('Failed to start application', error);
  }
}
bootstrap();
