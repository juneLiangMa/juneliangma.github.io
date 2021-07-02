import { getPhotoPath, getSmallPhotoPath } from "../posts";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FeedPost } from "../types";
import { Link } from "react-router-dom";

interface FeedPostParams {
  feedPost: FeedPost;
}

export default ({ feedPost }: FeedPostParams) => {
  const postTags = feedPost.tags.map((tag) => (
    <span className="bg-accent bold white ph1 rounded m1">
      {tag.toUpperCase()}
    </span>
  ));
  const postCoverPhoto = !feedPost ? null : (
    <div className="t-center">
      <LazyLoadImage
        className="w-100"
        effect="blur"
        alt={`Cover Photo for ${feedPost.title}`}
        placeholderSrc={getSmallPhotoPath(feedPost.cover)}
        src={getPhotoPath(feedPost.cover)}
      />
    </div>
  );
  const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });
  const postDate = dateFormatter.format(feedPost.date);

  return (
    <div className="card">
      {postCoverPhoto}
      <div className="t-center">{postTags}</div>
      <h2 className="t-center">
        <Link to={`/read/${feedPost.path}`}>{feedPost.title}</Link>
      </h2>
      <h4 className="t-center">{postDate}</h4>
      <p className="t-center mt3 feed-desc ph3">
        {feedPost.shortDescription}...
      </p>
    </div>
  );
};
