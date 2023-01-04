import styled from "styled-components";
import devices from "../utils/devices";

export const MainPageContainer = styled.div`
  background: #141414;
  color: #fff;
`;

export const MainContentContainer = styled.div`
  overflow: hidden;
`;

export const SliderContainer = styled.div`
  margin-top: -14vw;

  @media ${devices.medium} {
    margin-top: 2vh;
  }
`;
