import { Entity, Property } from '@mikro-orm/core';
import { Nullish } from '../../common/types/Nullish';

@Entity({ abstract: true })
export abstract class AbstractEntity {
  @Property({
    onCreate: () => new Date(),
  })
  createdAt: Date;

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;

  @Property({ nullable: true })
  deletedAt?: Nullish<Date>;

  abstract update(props: any): void;
}
