import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './utils/interceptors/response.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { v2 as cloudinary } from 'cloudinary';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ResponseInterceptor());
  const configService = app.get<ConfigService>(ConfigService);
  cloudinary.config({
    cloud_name: configService.get('uploadFiles.cloudinary.name'),
    api_key: configService.get('uploadFiles.cloudinary.api_key'),
    api_secret: configService.get('uploadFiles.cloudinary.api_secret'),
  });
  const config = new DocumentBuilder()
    .setTitle('Mysql  Boilerplate')
    .setDescription('Mysql  Boilerplate API docs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access_token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(configService.get('ports.main'));
}
bootstrap();
