import styled from "styled-components";

export const WatchPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: white;
`;

export const VideoContainer = styled.div``;

export const NavBar = styled.div`
  height: 60px;
  width: 100%;
  font-size: 2.5rem;
  padding: 12px 0 0 12px;

  svg {
    cursor: pointer;
    &:hover {
      color: white;
      transform: scale(1.2);
    }
  }
`;

export const YoutubeFrame = styled.iframe`
  width: 100%;
  height: calc(100vh - 72px);
  border: none;
`;
