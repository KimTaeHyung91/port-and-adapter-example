import { AbstractEntity } from '../entity/AbstractEntity';
import { EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@tsed/di';

@Injectable()
export class MikroOrmRepository<
  T extends AbstractEntity,
> extends EntityRepository<T> {
  save(entity: T) {
    this.em.persist(entity);

    return entity;
  }
}
