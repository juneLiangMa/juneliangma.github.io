import { Post, JsonPost, PhotoMap, Photo, JsonFeedPost, FeedPost } from "types";

export const JsonToPost = (json: JsonPost): Post => {
  const photoMap: PhotoMap = {};
  json.photos.forEach((photo: Photo) => {
    photoMap[photo.id] = photo;
  });

  return {
    info: {
      ...json.info,
      date: new Date(json.info.date),
    },
    photos: photoMap,
  };
};

export const ConvertJsonFeedPost = (json: JsonFeedPost): FeedPost => {
  return {
    ...json,
    date: new Date(json.date),
  };
};

export const getPhotoPath = (path: string): string =>
  `/data/photos/${path}.webp`;
export const getSmallPhotoPath = (path: string): string =>
  `/data/photos/${path}.small.webp`;

export const getSmallPhotoPathFromKey = (key: string, map: PhotoMap): string =>
  getSmallPhotoPath(map[key].path);
export const getPhotoPathFromKey = (key: string, map: PhotoMap): string =>
  getPhotoPath(map[key].path);
