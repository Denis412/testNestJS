import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Здесь указываются разрешенные HTTP методы
    allowedHeaders: 'Content-Type, Accept, Authorization', // Здесь указываются разрешенные заголовки запроса
  });

  await app.listen(3000);
}
bootstrap();
