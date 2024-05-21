import { Injectable, registerProvider } from '@tsed/di';
import { EntityManager, MetadataStorage } from '@mikro-orm/core';
import { Em } from '@tsed/mikro-orm';
import { AfterInit } from '@tsed/common';
import { MikroOrmRepository } from './repository/MikroOrmRepository';

@Injectable()
export class MikroOrmProviderModule implements AfterInit {
  @Em()
  private readonly em: EntityManager;

  static getRepositoryToken(entityName: string) {
    return Symbol(`${entityName}_RepositoryToken`);
  }

  $afterInit(): void {
    const metadata = Object.values(MetadataStorage.getMetadata());

    for (const meta of metadata) {
      if (meta.abstract) {
        continue;
      }

      const entityName = meta.name || '';

      registerProvider({
        provide: MikroOrmProviderModule.getRepositoryToken(entityName),
        useFactory: () => new MikroOrmRepository(this.em, entityName),
      });
    }
  }
}
