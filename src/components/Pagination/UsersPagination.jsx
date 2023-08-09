import React from "react";
import styled from "styled-components";
import { primary } from "../../Styles/theme";
import { useSelector, useDispatch } from "react-redux";
import { setActiveUserPage } from "../redux/slices/paginationSlice";

export const UsersPagination = () => {
  const dispatch = useDispatch();

  const { activeUserPage, totalCount, perPage } = useSelector(
    (state) => state.pagination
  );

  const totalPageCount = Math.ceil(totalCount / perPage);

  const incPage = () => {
    return activeUserPage < totalPageCount
      ? dispatch(setActiveUserPage(activeUserPage + 1))
      : null;
  };

  const decPage = () => {
    return activeUserPage > 1
      ? dispatch(setActiveUserPage(activeUserPage - 1))
      : "";
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
        <span>{activeUserPage}</span> of {totalPageCount}
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

export const PagesList = styled.div`
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
