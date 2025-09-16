import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.enableShutdownHooks(); // ← 追加（SIGTERM/SIGINT時に onModuleDestroy が呼ばれる）
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
