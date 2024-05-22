import { Entity, Property } from '@mikro-orm/core';
import { Nullish } from '../../common/types/Nullish';
import { TConstructProps } from '../../common/types/Props';
import { Constructor } from '../../common/types/Constructor';

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

  abstract update<T extends Constructor<T>>(props: TConstructProps<T>): void;
}
