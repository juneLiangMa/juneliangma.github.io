import React from "react";
import { Link } from "react-router-dom";

interface PaginationParam {
  numberOfItems: number;
  pagePath: string;
  itemsPerPage: number;
  currentPage: number;
  maxButtonsVisible: number;
}

export default ({
  pagePath,
  numberOfItems,
  currentPage,
  itemsPerPage,
  maxButtonsVisible,
}: PaginationParam) => {
  const totalPages = Math.ceil(numberOfItems / itemsPerPage);

  const numLeftOfCenter = Math.ceil(maxButtonsVisible / 2);
  const numRightOfCenter = Math.floor(maxButtonsVisible / 2);
  const leftmostButton = Math.max(
    0,
    Math.max(0, currentPage - numLeftOfCenter) -
      Math.abs(Math.min(0, totalPages - (currentPage + numRightOfCenter)))
  );
  const rightMostButton = Math.min(
    totalPages,
    Math.min(totalPages, currentPage + numRightOfCenter) +
      Math.abs(Math.min(0, currentPage - numLeftOfCenter))
  );
  const totalButtons = Math.abs(rightMostButton - leftmostButton);

  const selectedButtonClasses = "m1 rounded btn bg-accent b-accent white";
  const unselectedButtonClasses = "m1 rounded btn accent";

  console.log(
    `${numLeftOfCenter}: ${leftmostButton}, ${numRightOfCenter}: ${rightMostButton}, ${totalButtons}`
  );

  const buttons = Array(totalButtons)
    .fill(0)
    .map((_, i) => (
      <Link
        className={
          leftmostButton + i + 1 === currentPage
            ? selectedButtonClasses
            : unselectedButtonClasses
        }
        to={`${pagePath}/${leftmostButton + i + 1}`}
      >
        {leftmostButton + i + 1}
      </Link>
    ));

  return <span>{buttons}</span>;
};
