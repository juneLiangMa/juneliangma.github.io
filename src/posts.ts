import { Post, JSONPost, PhotoMap } from "types";

export const JSONToPost = (json: JSONPost): Post => {
  const photoMap: PhotoMap = {}
  json.photos.forEach((photo) => {
    photoMap[photo.id] = photo
  })

  return {
    info: {
      title: json.info.title,
      tags: json.info.tags,
      post: json.info.post,
      date: new Date(json.info.date)
    },
    photos: photoMap
  }
}
