import { Comment } from './Comment.ts';

export interface Moment {

  comments: Comment[] | null;

  content: null | string;

  date: string;

  id: string;

  images: string | null;

  likes: string | null;

  userAvatar: string;

  userId: string;

  userName: string;
}
