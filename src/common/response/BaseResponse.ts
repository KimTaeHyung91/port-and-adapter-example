import { Nullish } from '../types/Nullish';
import { CollectionOf, Enum, Property } from '@tsed/schema';

enum Result {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export class BaseResponse<T> {
  @Enum(Result)
  private result: Result;

  @CollectionOf('T')
  private data: T;

  @Property()
  private message: Nullish<string>;

  @Property()
  private errorCode: Nullish<string>;

  constructor({
    data,
    message = null,
    errorCode = null,
    result = Result.SUCCESS,
  }: {
    data: T;
    message?: Nullish<string>;
    errorCode?: Nullish<string>;
    result?: Result;
  }) {
    this.data = data;
    this.message = message;
    this.errorCode = errorCode;
    this.result = result;
  }
}
