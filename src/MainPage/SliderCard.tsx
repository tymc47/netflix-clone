import styled from "styled-components";
import { Movie } from "../types";
const imageUrl = process.env.REACT_APP_IMG_URL;

const SliderCardContainer = styled.div`
  display: inline-block;
  border-radius: 4px;
  overflow: hidden;

  margin: 0 5px;
  img {
    width: ${({ itemWidth }: { itemWidth: number }) => `${itemWidth - 10}px`};
    object-fit: contain;
  }
`;

const SliderCard = ({
  movie,
  itemWidth,
}: {
  movie: Movie;
  itemWidth: number;
}) => {
  return (
    <SliderCardContainer itemWidth={itemWidth}>
      <img
        key={movie.id}
        src={`${imageUrl}/w500${movie.poster_path}`}
        alt={movie.title}
      />
    </SliderCardContainer>
  );
};

export default SliderCard;
