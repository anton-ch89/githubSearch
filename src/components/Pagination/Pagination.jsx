import React, { useContext } from "react";
import styled from "styled-components";
import { primary } from "../../Styles/theme";
import { AppContext } from "../../App";

export const Pagination = () => {
  const {
    activeUserPage,
    activeRepoPage,
    setActiveUserPage,
    setActiveRepoPage,
    totalPageCount,
    filter,
  } = useContext(AppContext);
  const incPage = () => {
    if (filter === "users") {
      return activeUserPage < totalPageCount
        ? setActiveUserPage((prev) => prev + 1)
        : "";
    } else {
      return activeRepoPage < totalPageCount
        ? setActiveRepoPage((prev) => prev + 1)
        : "";
    }
  };
  const decPage = () => {
    if (filter === "users") {
      return activeUserPage > 1 ? setActiveUserPage((prev) => prev - 1) : "";
    } else {
      return activeRepoPage > 1 ? setActiveRepoPage((prev) => prev - 1) : "";
    }
  };
  if (!totalPageCount) {
    return "";
  }
  return (
    <PagesList>
      {activeUserPage > 1 ? (
        <p onClick={decPage} className="arrow">
          ◁
        </p>
      ) : (
        ""
      )}

      <p className="page-wrapper">
        <span>{filter === "users" ? activeUserPage : activeRepoPage}</span> of{" "}
        {totalPageCount}
      </p>
      {activeUserPage < totalPageCount ? (
        <p onClick={incPage} className="arrow">
          ▷
        </p>
      ) : (
        ""
      )}
    </PagesList>
  );
};

const PagesList = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 40px;
  & p {
    font-size: 20px;
    color: ${primary};
    text-align: center;
  }
  & .page-wrapper {
    margin: 0 20px;
  }
  .arrow {
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
  }
`;
