import AdminBro from 'admin-bro';
import { Database, Resource } from '@admin-bro/typeorm';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

AdminBro.registerAdapter({ Database, Resource });

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();