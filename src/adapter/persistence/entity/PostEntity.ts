import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { AbstractEntity } from '../AbstractEntity';
import { TConstructProps } from '../../../common/types/Props';
import { Post } from '../../../domain/post/Post';
import { PostId } from '../../../domain/post/PostId';

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

  @Property({ type: 'jsonb' })
  meta: object;

  toDomain() {
    return Post.of({
      id: new PostId(this.id),
      postToken: this.postToken,
      content: this.content,
      author: this.author,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      meta: this.meta,
    });
  }

  update(post: TConstructProps<Post>): void {
    if (post.content) this.content = post.content;
    if (post.deletedAt) this.deletedAt = post.deletedAt;

    if (post.meta) this.meta = post.meta;

    this.author = post.author ?? null;
  }
}
