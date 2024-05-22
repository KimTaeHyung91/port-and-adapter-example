import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { AbstractEntity } from '../AbstractEntity';
import { TConstructProps } from '../../../common/types/Props';
import { Post } from '../../../domain/post/Post';

@Entity({ tableName: 'post' })
export class PostEntity extends AbstractEntity {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  postToken: string;

  @Property({ type: 'text' })
  content: string;

  @Property({ nullable: true })
  author: string | null;

  update(post: TConstructProps<Post>): void {
    if (post.content) this.content = post.content;
    if (post.deletedAt) this.deletedAt = post.deletedAt;

    this.author = post.author ?? null;
  }
}
