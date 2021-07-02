import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FeedParam, FeedPost, JsonFeedPosts } from "../types";
import FeedPostComponent from "../component/FeedPost";
import Pagination from "../component/Pagination";
import { ConvertJsonFeedPost } from "../posts";
import NoMatch from "./NoMatch";

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
      : articleSlice(
          [...allPosts].sort((a, b) => b.date.getTime() - a.date.getTime()),
          parseInt(currentPage)
        );
  const postElements = posts.map((post) => (
    <div className="mb2">
      <FeedPostComponent feedPost={post} />
    </div>
  ));
  const pagination =
    pageValidNumber && allPosts ? (
      <Pagination
        pagePath="/feed"
        numberOfItems={allPosts.length}
        itemsPerPage={4}
        currentPage={parsedNumber}
        maxButtonsVisible={5}
      />
    ) : null;

  if (!loading && posts.length == 0) {
    return <NoMatch />;
  }

  return (
    <>
      {postElements}
      <hr />
      <div className="t-center pv2">{pagination}</div>
    </>
  );
};
