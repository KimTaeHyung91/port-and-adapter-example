import { Controller, Inject } from '@tsed/di';
import { Delete, Get, Post, Put } from '@tsed/schema';
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

    return new BaseResponse({ data: token });
  }

  @Get('/:token')
  async retrievePost(@PathParams('token') token: string) {
    const main = await this.useCase.retrievePost(token);

    return new BaseResponse({ data: main });
  }

  @Put('/:token')
  async modifyPost(
    @PathParams('token') token: string,
    @BodyParams() request: PostRequestDto.RequestModifyPost,
  ) {
    const command = new PostCommand.ModifyPost();
    command.content = request.content;
    command.author = request.author;

    const main = await this.useCase.modifyPost(token, command);

    return new BaseResponse({ data: main });
  }

  @Delete('/:token')
  async removePost(@PathParams('token') token: string) {
    await this.useCase.removePost(token);

    return new BaseResponse({ data: null });
  }
}
