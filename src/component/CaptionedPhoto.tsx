import React from "react";
import { PhotoMap } from "types";
import { getPhotoPathFromKey, getSmallPhotoPathFromKey } from "../posts";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface CaptionedPhotoParams {
  photoKey: string;
  photos: PhotoMap;
}

export default ({ photoKey, photos }: CaptionedPhotoParams) => (
  <div className="t-center pv3">
    <LazyLoadImage
      className="w-100"
      effect="blur"
      alt={`Photo with Caption ${photos[photoKey].caption}`}
      placeholderSrc={getSmallPhotoPathFromKey(photoKey, photos)}
      src={getPhotoPathFromKey(photoKey, photos)}
    />
    <p>{photos[photoKey].caption}</p>
  </div>
);
