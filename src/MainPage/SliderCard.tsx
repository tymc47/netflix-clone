import styled from "styled-components";
import { Movie } from "../types";
const imageUrl = process.env.REACT_APP_IMG_URL;

const SliderCardContainer = styled.div`
  display: inline-block;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 5px;
  img {
    width: 12.3vw;
    object-fit: contain;
  }
`;

const SliderCard = ({ movie }: { movie: Movie }) => {
  return (
    <SliderCardContainer>
      <img key={movie.id} src={`${imageUrl}/w500${movie.poster_path}`} />
    </SliderCardContainer>
  );
};

export default SliderCard;
