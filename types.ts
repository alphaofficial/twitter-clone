export interface ITweet {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  imageSrc: string[];
  userId: number;
  user: {
    firstname: string;
    lastname: string;
    username: string;
    avatar: string;
  };
  retweets: any[];
  likes: any[];
  replies: any[];
}
