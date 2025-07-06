import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);
  const httpPort = configService.get<number>('HTTP_PORT');
  const tcpPort = configService.get<number>('TCP_PORT');

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: tcpPort,
    },
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();

  const logger = app.get(Logger);

  try {
    await app.listen(httpPort);
    logger.log(`🚀 Auth HTTP service running on port ${httpPort}`);
  } catch (error) {
    logger.error('Error starting the application', error);
  }
}
bootstrap();
