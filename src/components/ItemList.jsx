import React from "react";
import styled from "styled-components";
import { UserCard } from "./Cards/UserCard";
import { ReposCard } from "./Cards/ReposCard";
import { screenSize } from "../Styles/theme";
import { useSelector } from "react-redux";

export const ItemList = () => {
  const { users, repos, isLoading, error } = useSelector((state) => state.data);
  const filter = useSelector((state) => state.search.filter);
  const getUsersData = () => {
    return users.map((obj, i) => {
      return <UserCard key={i} obj={obj} />;
    });
  };
  const getReposData = () => {
    return repos.map((obj, i) => {
      return <ReposCard key={i} obj={obj} />;
    });
  };

  if (error) {
    return <ErrorHeader>{error}</ErrorHeader>;
  }
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
const ErrorHeader = styled.h2`
  color: red;
`;
