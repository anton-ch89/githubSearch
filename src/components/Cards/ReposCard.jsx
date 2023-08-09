import React from "react";
import { Link } from "react-router-dom";
import { ListItem } from "./UserCard";
import styled from "styled-components";
import { GoRepo } from "react-icons/go";
import { screenSize } from "../../Styles/theme";
import { useDispatch } from "react-redux";
import { setRepoUrl } from "../redux/slices/cardsSlice";

export const ReposCard = ({ obj }) => {
  const dispatch = useDispatch();

  return (
    <ListRepoItem>
      <Link
        to="/FullRepoCard"
        style={{ textDecoration: "none", color: "black" }}
        onClick={() => dispatch(setRepoUrl(obj.url))}
      >
        <div>
          <span>
            <GoRepo className="icon" />
          </span>
          <h3>{obj.name}</h3>
        </div>

        <p>Owner login: {obj.owner.login}</p>
        <p>Landguage: {obj.language}</p>
        <p>Number of viewers: {obj.watchers_count}</p>
      </Link>
    </ListRepoItem>
  );
};

const ListRepoItem = styled(ListItem)`
  width: 40%;
  @media (max-width: ${screenSize.tablet}) {
    display: flex;
    justify-content: center;
    width: 99%;
  }
  & div {
    display: flex;
    align-items: center;
    @media (max-width: ${screenSize.laptop}) {
      flex-direction: column;
      justify-content: center;
      align-items: start;
    }
    @media (max-width: ${screenSize.tablet}) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  & span {
    width: 45px;
    height: 45px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #ffe0f0;
  }
  & .icon {
    color: #da4a91;
  }
  & h3 {
    margin-left: 20px;
    @media (max-width: ${screenSize.laptop}) {
      margin-left: 0;
    }
    @media (max-width: ${screenSize.tablet}) {
      font-size: 1.1em;
      margin-left: 0;
    }
  }
  & p {
    margin: 5px 20px 5px 0;
    color: #696969;
  }
`;
