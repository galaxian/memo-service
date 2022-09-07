import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { setupSwagger } from './util/swagger';

const serverConfig = config.get('server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  const port = serverConfig.port;

  await app.listen(port);
}
bootstrap();
