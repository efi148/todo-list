import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

const configValidationPipe = {
  forbidNonWhitelisted: true,
  whitelist: true,
  transform: true,
  skipMissingProperties: true
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe(configValidationPipe));
  await app.listen(3000);
}
bootstrap();
