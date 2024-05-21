import { Service } from '../common/decorator/Service';
import { PostUseCase } from './in/PostUseCase';
import { LoadPostPort } from './out/LoadPost.port';
import { Inject } from '@tsed/di';
import { PostInfo } from './dto/PostInfo';
import { SavePostPort } from './out/SavePost.port';
import { PostCommand } from './dto/PostCommand';
import { Transactional } from '@tsed/mikro-orm';
import { Post } from '../domain/post/Post';

@Service({ type: PostUseCase })
export class PostService implements PostUseCase {
  constructor(
    @Inject(LoadPostPort)
    private readonly loadPostPort: LoadPostPort,
    @Inject(SavePostPort)
    private readonly savePostPort: SavePostPort,
  ) {}

  async retrievePost(token: string): Promise<PostInfo.Main> {
    const post = await this.loadPostPort.getPostBy(token);

    const main = new PostInfo.Main();

    main.token = post.postToken;
    main.content = post.content;

    return main;
  }

  // required async
  @Transactional()
  async registerPost(
    command: PostCommand.RegisterPost,
  ): Promise<PostInfo.PostToken> {
    const post = Post.init({
      content: command.content,
      author: command.author,
    });

    const savePost = this.savePostPort.save(post);

    const dto = new PostInfo.PostToken();

    dto.token = savePost.postToken;

    return dto;
  }
}