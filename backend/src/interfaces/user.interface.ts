export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IToken {
  data: {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  }
}