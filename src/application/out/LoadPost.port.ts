import { Post } from '../../domain/post/Post';

export const LoadPostPort = Symbol('LoadPostPort');

export interface LoadPostPort {
  getPostBy(token: string): Promise<Post>;
}
