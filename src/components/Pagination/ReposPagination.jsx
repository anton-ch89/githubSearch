import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveRepoPage } from "../redux/slices/paginationSlice";
import { PagesList } from "./UsersPagination";

export const ReposPagination = () => {
  const dispatch = useDispatch();

  const { activeRepoPage, totalCount, perPage } = useSelector(
    (state) => state.pagination
  );

  const totalPageCount = Math.ceil(totalCount / perPage);

  const incPage = () => {
    return activeRepoPage < totalPageCount
      ? dispatch(setActiveRepoPage(activeRepoPage + 1))
      : null;
  };

  const decPage = () => {
    return activeRepoPage > 1
      ? dispatch(setActiveRepoPage(activeRepoPage - 1))
      : null;
  };
  if (!totalPageCount) {
    return "";
  }
  return (
    <PagesList>
      {activeRepoPage > 1 ? (
        <p onClick={decPage} className="arrow">
          ◁
        </p>
      ) : (
        ""
      )}

      <p className="page-wrapper">
        <span>{activeRepoPage}</span> of {totalPageCount}
      </p>
      {activeRepoPage < totalPageCount ? (
        <p onClick={incPage} className="arrow">
          ▷
        </p>
      ) : (
        ""
      )}
    </PagesList>
  );
};
