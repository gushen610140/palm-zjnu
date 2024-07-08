import { Comment } from './Comment.ts';

export interface Moment {

  comments: Comment[] | null;

  content: null | string;

  date: string;

  id: string;

  images: string | null;

  likes: number;

  userAvatar: string;

  userId: string;

  userName: string;
}
