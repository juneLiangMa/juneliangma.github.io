import React, { useState, useEffect } from "react";
import { FeedPost, JsonFeedPosts, JsonPost, Post } from "../types";
import { ConvertJsonFeedPost, getPhotoPath, getSmallPhotoPath } from "../posts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

export default () => {
  const [allPosts, setAllPosts] = useState<FeedPost[] | undefined>(undefined);
  const [chosenPost, setChosenPost] = useState<FeedPost | undefined>(undefined);
  const [chosenImage, setChosenImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch("/data/posts.json")
      .then((res) => res.json())
      .then((result: JsonFeedPosts) => {
        if (result.posts.length > 0) {
          setAllPosts(result.posts.map(ConvertJsonFeedPost));
        } else {
          setAllPosts(undefined);
        }
      });
  }, []);

  useEffect(() => {
    if (allPosts) {
      const randomPost = Math.floor(Math.random() * allPosts.length);
      const chosenPost = allPosts[randomPost];
      fetch("/data/" + chosenPost.path + ".json")
        .then((res) => res.json())
        .then((result: JsonPost) => {
          const randomImage = Math.floor(Math.random() * result.photos.length);
          const image = result.photos[randomImage].path;
          setChosenPost(chosenPost);
          setChosenImage(image);
        });
    }
  }, [allPosts]);

  const image = chosenImage ? (
    <div className="t-center">
      <LazyLoadImage
        className="w-100"
        effect="blur"
        placeholderSrc={getSmallPhotoPath(chosenImage)}
        src={getPhotoPath(chosenImage)}
      />
    </div>
  ) : null;
  const subtitle = chosenPost ? (
    <h4 className="t-center">
      From <Link to={`/read/${chosenPost.path}`}>{chosenPost.title}</Link>
    </h4>
  ) : null;

  return (
    <>
      <h1 className="t-center pt3">Page Not Found</h1>
      {image}
      {subtitle}
    </>
  );
};
