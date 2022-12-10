import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTrending } from "../services/TMDB";
import { Movie } from "../types";
import SliderCard from "./SliderCard";
import { ReactComponent as Left_icon } from "../assets/left.svg";
import { ReactComponent as Right_icon } from "../assets/right.svg";
import { rotateMovieArray } from "../utils";

interface SliderProps {
  translationX: string;
}

const RowContainer = styled.div`
  position: relative;
  width: 100vw;
  box-sizing: border-box;
  z-index: 8;
  overflow: hidden;

  div.row-header {
    margin: 0 4vw 0.5rem;
    h2 {
      line-height: 1.3;
    }
  }
`;

const Slider = styled.div`
  position: relative;
  overflow-x: visible;
  padding: 0 4vw;
  white-space: nowrap;

  div.slider-control {
    position: absolute;
    height: 100%;
    width: 3.5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: hsla(0, 0%, 8%, 0.5);
    z-index: 20;
    border-radius: 4px;

    &:hover svg {
      transform: scale(2);
    }

    svg {
      fill: white;
      transform: scale(1.5);
    }
  }

  div.slider-control.left {
    left: 0;
  }

  div.slider-control.right {
    top: 0;
    right: 0;
  }
`;

const SliderContent = styled.div`
  transition: transform 0.5s;
`;

const RowSlider = () => {
  const [content, setContent] = useState<Movie[]>([]);
  const [display, setDisplay] = useState<Movie[]>([]);
  const [translation, setTranslation] = useState({});
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const NO_OF_MOVIE = 14;

  useEffect(() => {
    getTrending().then((data) => {
      setContent(data);
      setDisplay(data);
    });
  }, []);

  const handleRightClick = () => {
    setIsMoved(true);

    const rotated = rotateMovieArray(7, "left", display);

    setDisplay(rotated);
    setTranslation({ transform: "translateX(-40%)" });
    setTranslation({});
  };

  console.log(content);
  console.log(display);
  return (
    <RowContainer>
      <div className="row-header">
        <h2>Trending Now</h2>
      </div>
      <Slider>
        <div className="slider-control left">
          <Left_icon />
        </div>
        <SliderContent style={translation}>
          {display.length !== 0
            ? display.map((movie: Movie) => (
                <SliderCard key={movie.id} movie={movie} />
              ))
            : null}
        </SliderContent>
        <div className="slider-control right" onClick={handleRightClick}>
          <Right_icon />
        </div>
      </Slider>
    </RowContainer>
  );
};

export default RowSlider;
