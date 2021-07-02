import {
  getPhotoPath,
  getPhotoPathFromKey,
  getSmallPhotoPathFromKey,
  JsonToPost,
} from "../posts";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostParam, Post, JsonPost } from "types";
import BodySections from "../component/BodySections";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default () => {
  const { title } = useParams<PostParam>();
  const [postData, setPostData] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/" + title + ".json")
      .then((res) => res.json())
      .then((result: JsonPost) => {
        setLoading(false);
        setPostData(JsonToPost(result));
      });
  }, []);

  const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

  const postCoverPhoto =
    loading || !postData ? null : (
      <div className="t-center">
        <LazyLoadImage
          className="w-100"
          effect="blur"
          placeholderSrc={getSmallPhotoPathFromKey(
            postData!!.info.cover,
            postData.photos
          )}
          src={getPhotoPathFromKey(postData!!.info.cover, postData.photos)}
        />
      </div>
    );
  const postTitle = loading ? "Loading" : postData?.info.title;
  const postDate = loading ? "" : dateFormatter.format(postData?.info.date);
  const postBody = loading ? "" : postData?.info.post;
  const postTags = loading
    ? null
    : postData?.info.tags.map((tag) => (
        <span className="bg-accent bold white ph1 rounded m1">
          {tag.toUpperCase()}
        </span>
      ));

  return (
    <>
      {postCoverPhoto}
      <div className="t-center">{postTags}</div>
      <h1 className="t-center">{postTitle}</h1>
      <h4 className="t-center">{postDate}</h4>
      <BodySections text={postBody} photos={postData?.photos} />
    </>
  );
};
