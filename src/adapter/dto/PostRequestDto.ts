import { Nullish } from '../../common/types/Nullish';
import { Optional, Required } from '@tsed/schema';

export namespace PostRequestDto {
  export class RequestRegisterPost {
    @Required()
    content: string;

    @Optional()
    author?: Nullish<string>;
  }
}
