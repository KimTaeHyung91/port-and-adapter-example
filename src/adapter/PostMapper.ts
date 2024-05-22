import { Injectable } from '@tsed/di';
import { PostEntity } from './persistence/entity/PostEntity';
import { Post } from '../domain/post/Post';
import { PostId } from '../domain/post/PostId';
import { PostRequestDto } from './dto/PostRequestDto';
import { PostCommand } from '../application/dto/PostCommand';
import { Constructor } from '../common/types/Constructor';

@Injectable()
export class PostMapper {
  mapFromEntityToDomain(entity: PostEntity) {
    return Post.of({
      id: new PostId(entity.id),
      postToken: entity.postToken,
      author: entity.author,
      content: entity.content,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  mapFromDomainToEntity(domain: Post) {
    const postEntity = new PostEntity();

    if (domain.id?.value) {
      postEntity.id = domain.id.value;
    }

    if (domain.author) {
      postEntity.author = domain.author;
    }

    if (domain.updatedAt) {
      postEntity.updatedAt = domain.updatedAt;
    }

    if (domain.deletedAt) {
      postEntity.deletedAt = domain.deletedAt;
    }

    postEntity.content = domain.content;
    postEntity.createdAt = domain.createdAt;
    postEntity.postToken = domain.postToken;

    return postEntity;
  }

  mapFromDomainToExistEntity(domain: Post, entity: PostEntity) {
    entity.content = domain.content;
    entity.author = domain.author ?? null;
    entity.deletedAt = domain.deletedAt || null;
  }

  mapFromDtoToDto(
    origin: PostRequestDto.RequestRegisterPost,
    target: Constructor<PostCommand.RegisterPost>,
  ) {
    const _target = new target();

    _target.content = origin.content;
    _target.author = origin.author;

    return _target;
  }
}
