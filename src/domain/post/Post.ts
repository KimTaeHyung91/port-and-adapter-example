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
}

export class Post {
  id: Nullish<PostId>;

  postToken: string;

  content: string;

  author: Nullish<string>;

  createdAt: Date;

  updatedAt: Nullish<Date>;

  deletedAt: Nullish<Date>;

  private constructor(
    id: Nullish<PostId>,
    postToken: string,
    content: string,
    author: Nullish<string>,
    createdAt: Date,
    updatedAt: Nullish<Date>,
  ) {
    this.id = id;
    this.postToken = postToken;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static init({ content, author = null }: Pick<IPost, 'content' | 'author'>) {
    return new this(
      null,
      generateRandomString(20),
      content,
      author,
      new Date(),
      new Date(),
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
    );
  }

  modify(content: Nullish<string>, author: Nullish<string>) {
    if (content) {
      this.content = content;
    }

    if (author) {
      this.author = author;
    }
  }

  remove() {
    this.deletedAt = new Date();
  }
}
