import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from '../utils/constant';
import { VersioningType } from '@nestjs/common';
import { CustomInterceptors } from './common/interceptor/response.interceptor';
import { ExceptionResponse } from './common/exception/exception.exception';
import { ConfigService } from '@nestjs/config';
import { initializeSwagger } from './common/Swagger';

const exceptRes = new ExceptionResponse();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalInterceptors(new CustomInterceptors(exceptRes));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: configService.get('API_VERSION') || '1',
  })
  app.setGlobalPrefix(env.apiPrefix)
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true); // อนุญาตทุก origin
    },
    credentials: true, // รองรับการส่ง Cookies หรือ Headers การยืนยันตัวตน
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Headers ที่อนุญาต
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'], // รองรับทุก HTTP methods
    optionsSuccessStatus: 200, // สำหรับ preflight requests
  });
  await app.listen(3333);
  console.log("server is running on : http://localhost:" + env.appPort)
  initializeSwagger(app)

}
bootstrap();
