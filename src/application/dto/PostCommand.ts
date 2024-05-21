import { Nullish } from '../../common/types/Nullish';

export namespace PostCommand {
  export class RegisterPost {
    content: string;
    author: Nullish<string>;
  }
}
