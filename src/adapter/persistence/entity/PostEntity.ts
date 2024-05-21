import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { AbstractEntity } from '../../../common/entity/AbstractEntity';

@Entity({ tableName: 'post' })
export class PostEntity extends AbstractEntity {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  postToken: string;

  @Property({ type: 'text' })
  content: string;

  @Property({ nullable: true })
  author: string;
}
