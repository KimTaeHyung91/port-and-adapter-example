import { Nullish } from '../../common/types/Nullish';

export namespace PostInfo {
  export class Main {
    token: string;
    content: string;
    author: Nullish<string>;
  }

  export class PostToken {
    token: string;
  }
}
