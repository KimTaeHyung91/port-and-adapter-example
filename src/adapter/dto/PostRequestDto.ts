import { Nullish } from '../../common/types/Nullish';
import { Nullable, Optional, Required } from '@tsed/schema';

export namespace PostRequestDto {
  export class RequestRegisterPost {
    @Required()
    content: string;

    @Optional()
    author?: Nullish<string>;
  }

  export class RequestModifyPost {
    @Nullable(String)
    content?: string | null;

    @Nullable(String)
    author?: string | null;
  }
}
