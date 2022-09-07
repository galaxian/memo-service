import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { setupSwagger } from './util/swagger';
import { VersioningType } from '@nestjs/common';

const serverConfig = config.get('server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  const port = serverConfig.port;

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  app.setGlobalPrefix('/api');

  await app.listen(port);
}
bootstrap();
