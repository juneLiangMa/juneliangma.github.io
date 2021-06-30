import { Post, JSONPost, PhotoMap } from "types";

export const JSONToPost = (json: JSONPost): Post => {
  const photoMap: PhotoMap = {}
  json.photos.forEach((photo) => {
    photoMap[photo.id] = photo
  })

  return {
    info: json.info,
    photos: photoMap
  }
}
