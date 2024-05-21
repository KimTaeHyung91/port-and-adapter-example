import { Controller, Inject } from '@tsed/di';
import { Get, Post } from '@tsed/schema';
import { PostUseCase } from '../../../application/in/PostUseCase';
import { BodyParams, PathParams } from '@tsed/platform-params';
import { PostRequestDto } from '../../dto/PostRequestDto';
import { PostMapper } from '../../PostMapper';
import { PostCommand } from '../../../application/dto/PostCommand';
import { BaseResponse } from '../../../common/response/BaseResponse';

@Controller('/post')
export class PostRestApiController {
  constructor(
    @Inject(PostUseCase)
    private readonly useCase: PostUseCase,
    private readonly mapper: PostMapper,
  ) {}

  @Post()
  async registerPost(
    @BodyParams() request: PostRequestDto.RequestRegisterPost,
  ) {
    const command = this.mapper.mapFromDtoToDto(
      request,
      PostCommand.RegisterPost,
    );

    const token = await this.useCase.registerPost(command);

    console.log('token', token);

    return new BaseResponse({ data: token });
  }

  @Get('/:token')
  async retrievePost(@PathParams('token') token: string) {
    const main = await this.useCase.retrievePost(token);

    return new BaseResponse({ data: main });
  }
}
