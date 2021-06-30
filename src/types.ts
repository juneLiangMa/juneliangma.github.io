

export interface PostParam {
  title: string
}

export interface Photo {
  id: string,
  path: string,
  caption: string,
}

export interface PostInfo {
  title: string,
  date: Date,
  tags: string[],
  post: string
}

export interface PhotoMap {
  [key: string]: Photo
}

export interface Post {
  info: PostInfo,
  photos: PhotoMap
}

export interface JSONPost {
  info: PostInfo,
  photos: Photo[],
}
