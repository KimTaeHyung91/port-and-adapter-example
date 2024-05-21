import { $log } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
import { Server } from './Server';
import { MikroOrmProviderModule } from './common/MikroOrmProviderModule';

async function bootstrap() {
  try {
    const platform = await PlatformExpress.bootstrap(Server, {
      ...(await Server.autoScanProvider()),
      ...Server.mikroOrmConfiguration(),
      imports: [MikroOrmProviderModule],
    });
    await platform.listen();

    process.on('SIGINT', () => {
      platform.stop();
    });
  } catch (error) {
    $log.error({
      event: 'SERVER_BOOTSTRAP_ERROR',
      message: error.message,
      stack: error.stack,
    });
  }
}

bootstrap().catch((error) => console.error(error));
