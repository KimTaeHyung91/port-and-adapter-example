import { Adapter } from '../../../common/decorator/Adapter';
import { LoadPostPort } from '../../../application/out/LoadPost.port';
import { Post } from '../../../domain/post/Post';
import { SavePostPort } from '../../../application/out/SavePost.port';
import { EntityManager, NotFoundError } from '@mikro-orm/core';
import { PostMapper } from '../../PostMapper';
import { Em } from '@tsed/mikro-orm';
import { PostEntity } from '../entity/PostEntity';

@Adapter({ type: [LoadPostPort, SavePostPort] })
export class PostPersistenceAdapter implements LoadPostPort, SavePostPort {
  @Em()
  private readonly em: EntityManager;

  constructor(private readonly mapper: PostMapper) {}

  /**
   * @implements LoadPostPort.getPostBy
   */
  async getPostBy(token: string): Promise<Post> {
    const entity = await this.em.findOne(PostEntity, {
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
    this.em.persist(entity);

    return this.mapper.mapFromEntityToDomain(entity);
  }
}
