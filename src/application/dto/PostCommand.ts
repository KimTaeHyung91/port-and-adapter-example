import { Nullish } from '../../common/types/Nullish';

export namespace PostCommand {
  export class RegisterPost {
    content: string;
    author: Nullish<string>;
  }

  export class ModifyPost {
    content: Nullish<string>;

    author: Nullish<string>;

    meta: Nullish<object>;
  }
}
