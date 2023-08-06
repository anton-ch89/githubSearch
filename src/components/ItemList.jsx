import React from "react";
import styled from "styled-components";
import { UserCard } from "./Cards/UserCard";
import { ReposCard } from "./Cards/ReposCard";
import { screenSize } from "../Styles/theme";

export const ItemList = ({
  items,
  repos,
  isLoading,
  setUserUrl,
  filter,
  setRepoUrl,
}) => {
  const getUsersData = () => {
    return items.map((obj, i) => {
      return <UserCard key={i} obj={obj} setUserUrl={setUserUrl} />;
    });
  };
  const getReposData = () => {
    return repos.map((obj, i) => {
      return <ReposCard key={i} obj={obj} setRepoUrl={setRepoUrl} />;
    });
  };
  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }
  return (
    <ListWrapper>
      <ListItems>
        {filter === "users" ? getUsersData() : getReposData()}
      </ListItems>
    </ListWrapper>
  );
};
const ListWrapper = styled.div`
  width: 80%;
  @media (max-width: ${screenSize.tablet}) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const ListItems = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  flex-wrap: wrap;
  margin-bottom: 40px;
  @media (max-width: ${screenSize.tablet}) {
    justify-content: center;
    align-items: center;
  }
`;

export const Loading = styled.h2`
  margin-top: 50px;
  text-align: center;
`;
