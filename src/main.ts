import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Доска объявлений')
    .setDescription('Описание API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use("/graphql", graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }))

  app.enableCors({
    origin: ['http://localhost:8080', 'http://localhost:8081'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Здесь указываются разрешенные HTTP методы
    allowedHeaders: 'Content-Type, Accept, Authorization', // Здесь указываются разрешенные заголовки запроса
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
