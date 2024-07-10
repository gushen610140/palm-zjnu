export interface Banner {
  url: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  date: string;
  content: string;
  toUserId: string;
  toUserName: string;
  momentId: string;
}

export interface Moment {
  comments: string | null;
  content: null | string;
  date: string;
  id: string;
  images: string | null;
  likes: string | null;
  userAvatar: string;
  userId: string;
  userName: string;
}

export interface User {
  userId: string;
  userName: string;
  userAvatar: string;
  userStudentNumber: string;
  gender: string;
  wechatNumber: string;
  session: string;
}

export interface Result<T> {
  code: number;
  message: string;
  data: T;
}

export interface Token {
  openid: string;
  sessionKey: string,
}