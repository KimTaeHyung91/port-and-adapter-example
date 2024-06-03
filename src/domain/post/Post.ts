import { Nullish } from '../../common/types/Nullish';
import { PostId } from './PostId';

const generateRandomString = (num: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

interface IPost {
  id: Nullish<PostId>;

  postToken: string;

  content: string;

  author: Nullish<string>;

  createdAt: Date;

  updatedAt: Nullish<Date>;

  deletedAt: Nullish<Date>;

  meta: object;
}

export class Post {
  id: Nullish<PostId>;

  postToken: string;

  content: string;

  author: Nullish<string>;

  createdAt: Date;

  updatedAt: Nullish<Date>;

  deletedAt: Nullish<Date>;

  meta: Nullish<object>;

  private constructor(
    id: Nullish<PostId>,
    postToken: string,
    content: string,
    author: Nullish<string>,
    createdAt: Date,
    updatedAt: Nullish<Date>,
    meta: Nullish<object>,
  ) {
    this.id = id;
    this.postToken = postToken;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.meta = meta;
  }

  static init({ content, author = null }: Pick<IPost, 'content' | 'author'>) {
    return new this(
      null,
      generateRandomString(20),
      content,
      author,
      new Date(),
      new Date(),
      null,
    );
  }

  static of(props: IPost) {
    return new this(
      props.id,
      props.postToken,
      props.content,
      props.author,
      props.createdAt,
      props.updatedAt,
      props.meta,
    );
  }

  modify(
    content: Nullish<string>,
    author: Nullish<string>,
    meta: Nullish<object>,
  ) {
    if (content) {
      this.content = content;
    }

    if (author) {
      this.author = author;
    }

    this.meta = { ...this.meta, ...meta };
  }

  remove() {
    this.deletedAt = new Date();
  }
}
