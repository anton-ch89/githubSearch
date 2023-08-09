import React, { useCallback, useState } from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { ItemList } from "./ItemList";
import { UsersPagination } from "./Pagination/UsersPagination";
import { ReposPagination } from "./Pagination/ReposPagination";
import { screenSize, primary } from "../Styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput, setFilter } from "./redux/slices/searchSlice";
import {
  setActiveRepoPage,
  setActiveUserPage,
} from "./redux/slices/paginationSlice";

export const Home = () => {
  const dispatch = useDispatch();

  const totalCount = useSelector((state) => state.pagination.totalCount);
  const filter = useSelector((state) => state.search.filter);
  const error = useSelector((state) => state.data.error);
  const [value, setValue] = useState("");

  const setDebounce = useCallback(
    debounce((str) => {
      dispatch(setSearchInput(str));
    }, 650),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    setDebounce(event.target.value);
    dispatch(setActiveRepoPage(1));
    dispatch(setActiveUserPage(1));
  };

  return (
    <AppWrapper>
      <h1>Search</h1>
      <MainInput type="text" value={value} onChange={onChangeInput} />
      {error ? (
        ""
      ) : totalCount === null ? (
        <span>Loading...</span>
      ) : totalCount === 0 ? (
        ""
      ) : (
        <span style={{ color: "#14a4e7", fontSize: "16px" }}>
          Toatal: {totalCount}
        </span>
      )}
      <ButtonWrapper>
        <FilterButton onClick={() => dispatch(setFilter("users"))}>
          Users
        </FilterButton>
        <FilterButton onClick={() => dispatch(setFilter("repositories"))}>
          Repositories
        </FilterButton>
      </ButtonWrapper>
      {totalCount === 0 ? (
        <h2 style={{ color: "red" }}>No matches</h2>
      ) : (
        <>
          <ItemList />
          {filter === "users" ? <UsersPagination /> : <ReposPagination />}
        </>
      )}
    </AppWrapper>
  );
};

const AppWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & h1 {
    font-size: 36px;
    color: ${primary};
  }
`;

const MainInput = styled.input`
  border: 1px solid ${primary};
  padding: 12px 20px;
  width: 30%;
  border-radius: 10px;
  font-size: 16px;
  padding-left: 42px;
  outline: none;
  transition: 0.6s;
  @media (max-width: ${screenSize.tablet}) {
    width: 40%;
  }
  &:focus {
    border: 1px solid #64c9f8;
    box-shadow: 0px 0px 9px 0px rgba(100, 201, 248, 0.75);
  }
  &:hover {
    border: 1px solid #64c9f8;
    box-shadow: 0px 0px 9px 0px rgba(100, 201, 248, 0.75);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  :first-child {
    margin-right: 15px;
  }
  @media (max-width: ${screenSize.tablet}) {
    flex-direction: column;
    align-items: center;
    :first-child {
      margin-right: 0;
    }
  }
`;

const FilterButton = styled.button`
  margin-top: 30px;
  width: 250px;
  height: 50px;
  font-size: 18px;
  border: 1px solid ${primary};
  border-radius: 15px;
  background: none;
  cursor: pointer;
  color: ${primary};

  &:hover {
    background-color: ${primary};
    color: #fff;
    transition: 0.6s;
    color: #fff;
  }
`;
