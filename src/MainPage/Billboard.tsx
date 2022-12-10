import styled from "styled-components";
import { Movie } from "../types";
const imageUrl = process.env.REACT_APP_IMG_URL;
import backgroundImage from "../assets/netflixHKbg.jpeg";
import { ReactComponent as Play_icon } from "../assets/play.svg";
import { ReactComponent as Info_icon } from "../assets/info.svg";

export const BillboardContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: grid;
`;

export const BillboardMain = styled.div`
  grid-area: 1/1/2/2;
  width: 100vw;
  margin-top: -70px;

  img.backdrop {
    width: 100vw;
    object-fit: cover;
    z-index: 1;
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
  z-index: 2;
`;

const LogoAndTextContainer = styled.div`
  z-index: 3;
  color: white;
  position: absolute;
  top: 7.5%;
  left: 4%;
  width: 32.5vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;

  img.logo {
    width: 100%;
  }

  div.empty-logo {
    width: 100%;
    height: 30vh;
  }

  div.overview {
    width: 32.5vw;
    font-size: 1.25vw;
    line-height: 1.2;
  }

  div.button-control {
    width: 100%;
    display: flex;
    column-gap: 16px;

    button {
      max-height: 3.5rem;
      padding: 0rem 1.5rem 0rem 0.6rem;
      border-radius: 4px;
      cursor: pointer;
      border: none;
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-family: "Netflix Sans Light";

      svg {
        transform: scale(0.8);
      }
    }

    button.info {
      background-color: rgba(109, 109, 110, 0.7);
      color: white;

      svg {
        fill: white;
      }
    }
  }
`;

const Billboard = ({ billboardMovie }: { billboardMovie: Movie | null }) => {
  console.log(billboardMovie);
  console.log(billboardMovie?.logo?.file_path);
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
