import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import '@tsed/platform-express'; // /!\ keep this import
import '@tsed/ajv';
import { config } from './config';
import { importProviders } from '@tsed/components-scan';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

@Configuration({
  ...config,
  rootDir: __dirname,
  httpsPort: false,
  httpPort: 6000,
  middlewares: [
    'cors',
    'cookie-parser',
    'compression',
    'method-override',
    'json-parser',
    { use: 'urlencoded-parser', options: { extended: true } },
  ],
  exclude: ['**/*.spec.ts'],
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;

  static async autoScanProvider(): Promise<Partial<TsED.Configuration>> {
    const autoScanProvider = await importProviders({
      mount: {
        '/api': [`${__dirname}/adapter/web/in/**/*Controller.ts`],
      },
      imports: [
        `${__dirname}/application/**/*Service.ts`,
        `${__dirname}/adapter/persistence/**/*Adapter.ts`,
        `${__dirname}/adapter/**/*Mapper.ts`,
      ],
    });

    return {
      ...autoScanProvider,
    };
  }

  static mikroOrmConfiguration() {
    const configuration: Partial<TsED.Configuration> = {
      mikroOrm: [
        {
          contextName: 'default',
          driver: PostgreSqlDriver,
          host: 'localhost',
          port: 15432,
          dbName: 'my_db',
          user: 'my_postgresql',
          password: 'my_postgresql',
          entities: [`${__dirname}/adapter/persistence/entity/**/*{.ts, .js}`],
          debug: true,
        },
      ],
    };

    return { ...configuration };
  }
}
