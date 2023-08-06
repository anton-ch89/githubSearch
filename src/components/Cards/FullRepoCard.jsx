import React from "react";
import styled from "styled-components";
import { Card } from "./FullUserCard";
import { Cards } from "./FullUserCard";
import { Loading } from "../ItemList";
import { GitLink } from "./FullUserCard";

export const FullRepoCard = ({ repoInfo }) => {
  if (!Object.keys(repoInfo).length) {
    return <Loading>Loading...</Loading>;
  }
  return (
    <CardsWrapper>
      <Cards>
        <Card>
          <div className="header">
            <div style={{ width: "70%" }}>
              <p>Name: {repoInfo.name}</p>
              <p>{repoInfo.description}</p>
              <p>Language: {repoInfo.language}</p>
              {repoInfo.homepage ? (
                <p>
                  Homepage: <a href={repoInfo.homepage}> {repoInfo.homepage}</a>
                </p>
              ) : (
                ""
              )}
            </div>
            <GitLink href={repoInfo.html_url}>
              <button>Go to page</button>
            </GitLink>
          </div>
        </Card>
        <Card>
          <div className="header">
            <img src={repoInfo.owner.avatar_url} alt="" />
            <div>
              <p>Login: {repoInfo.owner.login}</p>
              <p>Type: {repoInfo.owner.type}</p>
            </div>

            <GitLink href={repoInfo.owner.html_url}>
              <button>Go to page</button>
            </GitLink>
          </div>
        </Card>
      </Cards>
    </CardsWrapper>
  );
};

const CardsWrapper = styled.section`
  display: flex;
  justify-content: space-around;
  margin: 40px;
  .header {
    @media (max-width: 500px) {
      flex-direction: column;
      align-items: center;
    }
  }
`;
