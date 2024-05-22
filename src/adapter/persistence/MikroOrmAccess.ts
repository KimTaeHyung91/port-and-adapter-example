import { Injectable } from '@tsed/di';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Em, Orm } from '@tsed/mikro-orm';

@Injectable()
export class MikroOrmAccess {
  @Em()
  private _em: EntityManager;

  @Orm()
  private _orm: MikroORM;

  get em(): EntityManager {
    return this._em;
  }

  get orm(): MikroORM {
    return this._orm;
  }
}
