export interface PostParam {
  title: string;
}

export interface FeedParam {
  page?: string;
}

export interface Photo {
  id: string;
  path: string;
  caption: string;
}

type PhotoId = string;

export interface PostInfo {
  title: string;
  date: Date;
  tags: string[];
  post: string;
  cover: PhotoId;
}

export interface PhotoMap {
  [key: string]: Photo;
}

export interface Post {
  info: PostInfo;
  photos: PhotoMap;
}

export interface JsonPost {
  info: PostInfo;
  photos: Photo[];
}

export interface JsonFeedPost {
  path: string;
  title: string;
  tags: string[];
  cover: string;
  date: string;
  shortDescription: string;
}

export interface FeedPost {
  path: string;
  title: string;
  tags: string[];
  cover: string;
  date: Date;
  shortDescription: string;
}

export interface JsonFeedPosts {
  posts: JsonFeedPost[];
}
