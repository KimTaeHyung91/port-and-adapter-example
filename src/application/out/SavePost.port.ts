import { Post } from '../../domain/post/Post';

export const SavePostPort = Symbol('SavePostPort');

export interface SavePostPort {
  save(post: Post): Post;

  update(post: Post): Promise<void>;
}
