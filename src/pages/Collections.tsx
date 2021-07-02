import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FeedParam, FeedPost, JsonFeedPosts } from "../types";
import FeedPostComponent from "../component/FeedPost";
import { ConvertJsonFeedPost } from "../posts";

export interface GroupMap {
  [key: string]: TagGroup;
}

interface TagGroup {
  tag: string;
  posts: FeedPost[];
}

const articlesPerPage = 4;

const articleSlice = (feedList: FeedPost[], page: number): FeedPost[] => {
  const startingArticle = Math.max(page - 1, 0) * articlesPerPage;

  return feedList.slice(startingArticle, startingArticle + articlesPerPage);
};

export default () => {
  const { page } = useParams<FeedParam>();

  const currentPage = page ? page : "1";

  const [allPosts, setAllPosts] = useState<FeedPost[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/posts.json")
      .then((res) => res.json())
      .then((result: JsonFeedPosts) => {
        setLoading(false);
        setAllPosts(result.posts.map(ConvertJsonFeedPost));
      });
  }, []);

  const parsedNumber = parseInt(currentPage);
  const pageValidNumber = !isNaN(parsedNumber);
  const posts =
    loading || !allPosts || !pageValidNumber
      ? []
      : articleSlice(allPosts!!, parseInt(currentPage));

  const allTags: GroupMap = {};
  posts.forEach((post) => {
    post.tags.forEach((tag: string) => {
      if (!allTags[tag]) {
        allTags[tag] = {
          tag: tag,
          posts: [],
        };
      }

      allTags[tag].posts.push(post);
    });
  });

  const groupElements = Object.keys(allTags).map((tag) => {
    const tagGroup = allTags[tag];
    const sortedPosts = [...tagGroup.posts].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
    const elements = sortedPosts.map((post) => (
      <div className="collection-card mr2">
        <FeedPostComponent feedPost={post} />
      </div>
    ));
    return (
      <div>
        <h3>{tag.toUpperCase()}</h3>
        <div className="collection">{elements}</div>
      </div>
    );
  });

  return (
    <>
      {groupElements}
      <hr />
    </>
  );
};
