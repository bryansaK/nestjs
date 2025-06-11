import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000", // 🔥 Mets l'URL de ton frontend
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
    methods: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
