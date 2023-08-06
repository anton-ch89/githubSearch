import React, { useState } from "react";
import styled from "styled-components";
import { GoRepo } from "react-icons/go";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { VscGist } from "react-icons/vsc";
import { Loading } from "../ItemList";
import { primary } from "../../Styles/theme";

export const FullUserCard = ({ userInfo, userFollowers, userRepos }) => {
  const { public_repos, followers, following, public_gists } = userInfo;
  const [index, setIndex] = useState(0);
  const items = [
    {
      id: 1,
      icon: <GoRepo className="icon" />,
      label: "repos",
      value: public_repos,
      color: "pink",
    },
    {
      id: 2,
      icon: <FiUsers className="icon" />,
      label: "followers",
      value: followers,
      color: "green",
    },
    {
      id: 3,
      icon: <FiUserPlus className="icon" />,
      label: "following",
      value: following,
      color: "purple",
    },
    {
      id: 4,
      icon: <VscGist className="icon" />,
      label: "gists",
      value: public_gists,
      color: "yellow",
    },
  ];

  const getFollowers = () => {
    return userFollowers.map((e) => {
      return (
        <FollowersList key={e.id}>
          <div>
            <img src={e.avatar_url} alt="" />
            <p>{e.login}</p>
          </div>
          <GitLink href={e.html_url}>
            <button>Go to page</button>
          </GitLink>
        </FollowersList>
      );
    });
  };
  const getRepos = () => {
    return userRepos.map((e) => {
      return (
        <FollowersList key={e.id}>
          <p>{e.name}</p>
          <GitLink href={e.html_url}>
            <button>Go to page</button>
          </GitLink>
        </FollowersList>
      );
    });
  };

  if (!Object.keys(userInfo).length) {
    return <Loading>Loading...</Loading>;
  }
  return (
    <PageWrapper>
      <PlatesWrapper>
        <div className="plates">
          {items.map((e) => {
            return <Item key={e.id} {...e} />;
          })}
        </div>
      </PlatesWrapper>
      <CardWrapper>
        <Cards>
          <Card>
            <p className="title-user">User</p>
            <div className="header">
              <img src={userInfo.avatar_url} alt="" />
              <div>
                <p>{userInfo.name}</p>
                <p>Login: {userInfo.login}</p>
                {userInfo.email ? <span>{userInfo.email}</span> : ""}
              </div>

              <GitLink href={userInfo.html_url}>
                <button>Go to page</button>
              </GitLink>
            </div>
            <div className="user-info">
              {userInfo.company ? <p>Company: {userInfo.company}</p> : ""}
              {userInfo.location ? <p>Location: {userInfo.location}</p> : ""}
              {userInfo.blog ? <p>Blog: {userInfo.blog}</p> : ""}
            </div>
          </Card>
          {userFollowers.length ? (
            <Card>
              <div className="title-wrapper">
                <p
                  onClick={() => setIndex(0)}
                  className={
                    index === 0 ? "title-foll" + " active" : "title-foll"
                  }
                >
                  Followers
                </p>
                <p
                  onClick={() => setIndex(1)}
                  className={
                    index === 1 ? "title-repo" + " active" : "title-repo"
                  }
                >
                  Repositories
                </p>
              </div>

              {index === 0 ? getFollowers() : getRepos()}
            </Card>
          ) : (
            ""
          )}
        </Cards>
      </CardWrapper>
    </PageWrapper>
  );
};

const Item = ({ icon, label, value, color }) => {
  return (
    <article className="item">
      <span className={color}>{icon}</span>
      <div>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </article>
  );
};
const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  @media (max-width: 950px) {
    flex-direction: column-reverse;
  }
`;

const PlatesWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin: 40px 0;

  .plates {
    width: 80%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1024px) {
      flex-wrap: wrap;
      justify-content: space-around;

    }
  
    .item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 15px;
      width: 15%;
      border-radius: 15px;
      box-shadow: 0px 0px 15px 0px rgba(38, 38, 38, 0.35);
      &:hover {
        box-shadow: 0px 0px 15px 0px rgba(38, 38, 38, 0.85);
      }
      @media (max-width: 1024px) {
        margin: 20px;
        width: 200px;
      }
    span {
        width: 45px;
        height: 45px;
        display: grid;
        place-items: center;
        border-radius: 50%;
      }
      .pink {
        background: #ffe0f0;
        color: #da4a91;
      }
      .green {
        background: rgba(84, 243, 84, 0.3);
        color: rgb(51, 212, 51);
            }
      .purple {
        background: #e6e6ff;
        color: #5d55fa;
      }
      .yellow {
        background: #fff5c7;
        color: #f0b429;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;


    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-top: 0;
      text-transform: capitalize;
    }
    }
  }

`;

const CardWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin: 100px 0 50px;
  @media (max-width: 1024px) {
    margin: 0 0 50px;
  }
`;
export const Cards = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 950px) {
    flex-wrap: wrap;
  }
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 42%;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0px 0px 15px 0px rgba(38, 38, 38, 0.35);
  @media (max-width: 950px) {
    width: 100%;
    margin-top: 40px;
  }
  &:hover {
    box-shadow: 0px 0px 15px 0px rgba(38, 38, 38, 0.85);
  }
  .title-wrapper {
    @media (max-width: 950px) {
      display: flex;
      justify-content: space-around;
    }
  }
  .title-user {
    color: #686868;
    position: absolute;
    top: 250px;
    cursor: pointer;
    @media (max-width: 1024px) {
      top: 340px;
    }
    @media (max-width: 950px) {
      display: none;
    }
  }
  .title-foll {
    color: #686868;
    position: absolute;
    top: 250px;
    cursor: pointer;
    @media (max-width: 1024px) {
      top: 340px;
    }
    @media (max-width: 950px) {
      position: static;
    }
  }

  .title-repo {
    color: #686868;
    position: absolute;
    top: 250px;
    right: 450px;
    cursor: pointer;
    @media (max-width: 1550px) {
      right: 300px;
    }
    @media (max-width: 1350px) {
      right: 200px;
    }
    @media (max-width: 1024px) {
      top: 340px;
      right: 120px;
    }
    @media (max-width: 950px) {
      position: static;
    }
  }
  .active {
    color: #000;
  }

  .user-info {
    margin-top: 40px;
    & p {
      margin: 0;
      color: #686868;
    }
  }
  & .header {
    display: flex;

    & img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid #ccc;
    }
    & div {
      display: flex;
      flex-direction: column;
      margin-left: 25px;

      & p {
        margin: 5px 30px 0 0;
      }
      & span {
        color: #ccc;
      }
    }
  }
`;

const FollowersList = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }

  & div {
    display: flex;
    align-items: center;
  }
  & img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-left: 30px;
  }
  & p {
    margin-left: 30px;
    @media (max-width: 500px) {
      margin-left: 10px;
    }
  }
`;
export const GitLink = styled.a`
  margin: 10px 0 0 auto;
  border-radius: 20px;
  text-decoration: none;
  width: 20%;
  height: 35%;
  @media (max-width: 1200px) {
    width: 30%;
  }
  @media (max-width: 500px) {
    margin: 5px 0 15px;
    width: 100%;
  }

  & button {
    background: none;
    border: 1px solid ${primary};
    border-radius: 20px;
    color: ${primary};
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
  & :hover {
    border: none;
    background-color: ${primary};
    color: #fff;
  }
`;
