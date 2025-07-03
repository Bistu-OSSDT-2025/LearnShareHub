interface Comment {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  likes: number;
  likedByUser: boolean;
}

export type CommentData = Comment[];
