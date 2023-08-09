import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { screenSize } from "../../Styles/theme";
import { useDispatch } from "react-redux";
import { setUserUrl } from "../redux/slices/cardsSlice";

export const UserCard = ({ obj }) => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      <Link
        to="/FullUserCard"
        style={{ textDecoration: "none" }}
        onClick={() => dispatch(setUserUrl(obj.url))}
      >
        <UserAvatar src={obj.avatar_url} alt="avatar" />
        <UserName>
          <b>Login:</b> {obj.login}
        </UserName>
      </Link>
    </ListItem>
  );
};

export const ListItem = styled.div`
  border: none;
  border-radius: 15px;
  margin-right: 30px;
  margin-top: 20px;
  padding: 15px;
  @media (max-width: ${screenSize.tablet}) {
    margin-right: 10px;
  }
  box-shadow: 0px 0px 15px 0px rgba(38, 38, 38, 0.35);
  &:hover {
    box-shadow: 0px 0px 15px 0px rgba(38, 38, 38, 0.85);
  }
`;
const UserAvatar = styled.img`
  width: 200px;
  height: 200px;
`;

const UserName = styled.p`
  color: black;
  text-align: center;
`;
