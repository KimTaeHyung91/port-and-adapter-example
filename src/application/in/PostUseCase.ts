import { PostInfo } from '../dto/PostInfo';
import { PostCommand } from '../dto/PostCommand';

export const PostUseCase = Symbol('PostUseCase');

export interface PostUseCase {
  retrievePost(token: string): Promise<PostInfo.Main>;

  registerPost(command: PostCommand.RegisterPost): Promise<PostInfo.PostToken>;
}
