import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { setupSwagger } from './util/swagger';
import { VersioningType } from '@nestjs/common';

const serverConfig = config.get('server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  app.setGlobalPrefix('/api');

  setupSwagger(app);
  const port = serverConfig.port;

  await app.listen(port);
}
bootstrap();
