import { Adapter } from '../../../common/decorator/Adapter';
import { LoadPostPort } from '../../../application/out/LoadPost.port';
import { Post } from '../../../domain/post/Post';
import { SavePostPort } from '../../../application/out/SavePost.port';
import { NotFoundError } from '@mikro-orm/core';
import { PostMapper } from '../../PostMapper';
import { PostEntity } from '../entity/PostEntity';
import { MikroOrmAccess } from '../MikroOrmAccess';

@Adapter({ type: [LoadPostPort, SavePostPort] })
export class PostPersistenceAdapter implements LoadPostPort, SavePostPort {
  constructor(
    private readonly mapper: PostMapper,
    private readonly mikroOrmAccess: MikroOrmAccess,
  ) {}

  /**
   * @implements LoadPostPort.getPostBy
   */
  async getPostBy(token: string): Promise<Post> {
    const entity = await this.mikroOrmAccess.em.findOne(PostEntity, {
      postToken: token,
    });

    if (!entity) {
      throw new NotFoundError('post entity not found');
    }

    return this.mapper.mapFromEntityToDomain(entity);
  }

  /**
   * @implements SavePostPort.save
   */
  save(post: Post): Post {
    const entity = this.mapper.mapFromDomainToEntity(post);
    this.mikroOrmAccess.em.persist(entity);

    return this.mapper.mapFromEntityToDomain(entity);
  }

  async update(post: Post): Promise<void> {
    const entity = await this.mikroOrmAccess.em.findOne(PostEntity, {
      postToken: post.postToken,
    });

    if (!entity) {
      throw new NotFoundError('not found');
    }

    entity.update(post);
  }
}
