import backgroundImage from "../assets/netflixHKbg.jpeg";
import styled from "styled-components";
import devices from "../utils/devices";

export const BgWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 0;

  &.card {
    width: 100vw;
    height: 692px;

    @media ${devices.large} {
      height: 542px;
    }

    @media ${devices.medium} {
      height: 536px;
    }

    img {
      width: 100%;
    }
  }

  &.fullscreen {
    overflow: hidden;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;

export const BgImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BgMask = styled.div`
  background: rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.7) 0,
    transparent 60%,
    rgba(0, 0, 0, 0.7)
  );
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
`;

interface PosterBackgroundProps {
  mode: "card" | "fullscreen";
}

const PosterBackground = ({ mode }: PosterBackgroundProps) => {
  return (
    <BgWrapper className={mode}>
      <BgImg src={backgroundImage} />
      <BgMask />
    </BgWrapper>
  );
};

export default PosterBackground;
