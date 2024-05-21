import { Inject } from '@tsed/di';
import { MikroOrmProviderModule } from '../MikroOrmProviderModule';
import { MetadataStorage } from '@mikro-orm/core';

export const Repository = (entity: any) => {
  const metadata = Object.values(MetadataStorage.getMetadata());

  const findEntity = metadata.find((meta) => meta.name === entity.name);

  const className = findEntity?.name || '';

  return Inject(MikroOrmProviderModule.getRepositoryToken(className));
};
