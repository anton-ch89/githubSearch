import React, { useCallback, useState } from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { ItemList } from "./ItemList";
import { Pagination } from "./Pagination/Pagination";
import { screenSize, primary } from "../Styles/theme";

export const Home = ({
  items,
  repos,
  isLoading,
  setFilter,
  setUserUrl,
  filter,
  searchInput,
  setSearchInput,
  setRepoUrl,
  activeUserPage,
  activeRepoPage,
  setActiveUserPage,
  setActiveRepoPage,
  totalCount,
  totalPageCount,
}) => {
  const [value, setValue] = useState("");
  const setDebounce = useCallback(
    debounce((str) => {
      setSearchInput(str);
    }, 550),
    []
  );
  const onChangeInput = (event) => {
    setValue(event.target.value);
    setDebounce(event.target.value);
  };

  return (
    <AppWrapper>
      <h1>Search</h1>
      <MainInput type="text" value={value} onChange={onChangeInput} />
      {totalCount === null ? (
        <span>Loading...</span>
      ) : (
        <span style={{ color: "#14a4e7" }}>Toatal: {totalCount}</span>
      )}
      <ButtonWrapper>
        <FilterButton onClick={() => setFilter("users")}>Users</FilterButton>
        <FilterButton onClick={() => setFilter("repositories")}>
          Repositories
        </FilterButton>
      </ButtonWrapper>
      <ItemList
        items={items}
        repos={repos}
        isLoading={isLoading}
        setUserUrl={setUserUrl}
        filter={filter}
        setRepoUrl={setRepoUrl}
      />
      <Pagination
        activeUserPage={activeUserPage}
        activeRepoPage={activeRepoPage}
        setActiveUserPage={setActiveUserPage}
        setActiveRepoPage={setActiveRepoPage}
        totalPageCount={totalPageCount}
        filter={filter}
      />
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
