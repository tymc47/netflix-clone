import styled from "styled-components";
import { Show } from "../types";
const imageUrl = process.env.REACT_APP_IMG_URL;
import backgroundImage from "../assets/netflixHKbg.jpeg";
import { BsPlayFill as Play_icon } from "react-icons/bs";
import { AiOutlineInfoCircle as Info_icon } from "react-icons/ai";
import devices from "../utils/devices";

export const BillboardContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: grid;

  @media ${devices.medium} {
    display: none;
  }
`;

export const BillboardMain = styled.div`
  grid-area: 1/1/2/2;
  width: 100vw;
  margin-top: -70px;

  img.backdrop {
    width: 100vw;
    object-fit: cover;
    z-index: -3;
  }
`;

export const LeftMask = styled.div`
  background: linear-gradient(77deg, rgba(0, 0, 0, 0.7), transparent 85%);
  opacity: 1;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 40%;
`;

export const BottomMask = styled.div`
  position: absolute;
  left: 0;
  background-color: transparent;
  background-image: linear-gradient(
    180deg,
    hsla(0, 0%, 8%, 0) 0,
    hsla(0, 0%, 8%, 0.15) 15%,
    hsla(0, 0%, 8%, 0.35) 29%,
    hsla(0, 0%, 8%, 0.58) 44%,
    #141414 68%,
    #141414
  );
  background-position: 0 top;
  background-repeat: repeat-x;
  background-size: 100% 100%;
  height: 14.7vw;
  width: 100%;
  opacity: 1;
  top: auto;
  bottom: -1px;
  z-index: 0;
`;

const LogoAndTextContainer = styled.div`
  z-index: 3;
  color: white;
  position: absolute;
  top: 10vh;
  left: 4%;
  width: 32.5vw;
  max-height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;

  @media ${devices.large} {
    width: 25vw;
    row-gap: 15px;
    top: 15%;
  }

  @media ${devices.mediumLarge} {
    width: 20vw;
    row-gap: 15px;
    top: 30%;
  }

  img.logo {
    width: 100%;
  }

  div.empty-logo {
    width: 100%;
    height: 20vh;
  }

  div.overview {
    width: 35vw;
    max-height: 8vh;
    font-size: max(1.75vh, 1.2vw);

    @media ${devices.large} {
      font-size: 1rem;
    }

    @media ${devices.mediumLarge} {
      display: none;
    }

    line-height: 1.2;
    overflow: scroll;
  }

  div.button-control {
    width: 100%;
    display: flex;
    column-gap: 16px;

    button {
      max-height: 3.5rem;
      padding: 1rem 1rem 1rem 0.8rem;
      border-radius: 4px;
      cursor: pointer;
      border: none;
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-family: "Netflix Sans Light";
      white-space: nowrap;

      @media ${devices.large} {
        max-height: 2.5rem;
        padding: 0.6rem 0.8rem 0.6rem 0.8rem;
        font-size: 1rem;
      }

      @media ${devices.mediumLarge} {
        max-height: 2rem;
        padding: 0.4rem 0.6rem 0.4rem 0.6rem;
        font-size: 0.8rem;
      }

      svg {
        font-size: 2rem;

        @media ${devices.large} {
          font-size: 1.4rem;
        }
        @media ${devices.mediumLarge} {
          font-size: 1rem;
        }
      }
    }

    button.info {
      background-color: rgba(109, 109, 110, 0.7);
      color: white;

      svg {
        margin-right: 0.5rem;
        fill: white;
      }
    }
  }
`;

const Billboard = ({ billboardMovie }: { billboardMovie: Show | null }) => {
  return (
    <BillboardContainer>
      <BillboardMain>
        <img
          className="backdrop"
          src={
            billboardMovie
              ? `${imageUrl}/original${billboardMovie.backdrop_path}`
              : backgroundImage
          }
        />

        <LogoAndTextContainer>
          {billboardMovie && billboardMovie.logo ? (
            <img
              className="logo"
              src={`${imageUrl}/w500${billboardMovie?.logo?.file_path}`}
            />
          ) : (
            <div className="empty-logo"></div>
          )}
          <div className="overview">{billboardMovie?.overview}</div>
          <div className="button-control">
            <button>
              <Play_icon />
              Play
            </button>
            <button className="info">
              <Info_icon />
              More Info
            </button>
          </div>
        </LogoAndTextContainer>
        <LeftMask />
        <BottomMask />
      </BillboardMain>
    </BillboardContainer>
  );
};

export default Billboard;
