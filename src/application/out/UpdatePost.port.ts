import { TDomainCallBack } from './Types';
import { Post } from '../../domain/post/Post';

export const UpdatePostPort = Symbol('UpdatePostPort');

export interface UpdatePostPort {
  update(token: string, domainCallBack: TDomainCallBack<Post>): Promise<Post>;
}
