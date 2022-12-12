import { useEffect, useState } from "react";
import styled from "styled-components";
import { getShowsByFilter } from "../services/TMDB";
import { Movie, SliderFilter, Tab } from "../types";
import SliderCard from "./SliderCard";
import { ReactComponent as Left_icon } from "../assets/left.svg";
import { ReactComponent as Right_icon } from "../assets/right.svg";
import { useSlider } from "../hooks";
import { shuffleShowArray } from "../utils";

const RowContainer = styled.div`
  position: relative;
  width: 100vw;
  box-sizing: border-box;
  z-index: 8;
  overflow: hidden;
  padding-bottom: 1rem;

  div.row-header {
    margin: 0.5rem 4vw 0.5rem;
    h2 {
      line-height: 1.3;
      margin: 0;
    }
  }
`;

const Slider = styled.div`
  position: relative;
  overflow-x: visible;
  padding: 0 4vw;
  white-space: nowrap;

  &:hover div.slider-control {
    opacity: 1;
  }

  div.slider-control {
    position: absolute;
    height: 100%;
    width: calc(4vw - 5px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: hsla(0, 0%, 8%, 0.5);
    z-index: 20;
    border-radius: 4px;
    opacity: 0;
    cursor: pointer;

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

const SliderContent = styled.div``;

const RowSlider = ({ filter, tab }: { filter: SliderFilter; tab: Tab }) => {
  const DISPLAY_COUNT = 7;

  const [content, setContent] = useState<Movie[]>([]);
  const {
    containerRef,
    displayItems,
    itemWidth,
    handleLeftClick,
    handleRightClick,
    sliderProps,
    isMoved,
  } = useSlider(content, DISPLAY_COUNT);

  useEffect(() => {
    getShowsByFilter(filter, tab).then((data) => {
      if (data) setContent(shuffleShowArray(data));
    });
  }, [filter, tab]);

  return (
    <RowContainer>
      <div className="row-header">
        <h2>{filter.filter}</h2>
      </div>
      <Slider>
        {isMoved ? (
          <div className="slider-control left" onClick={handleLeftClick}>
            <Left_icon />
          </div>
        ) : null}
        <SliderContent ref={containerRef} {...sliderProps}>
          {displayItems.length !== 0
            ? displayItems.map((movie: Movie) => (
                <SliderCard
                  key={`${filter.filter}${movie.id}`}
                  movie={movie}
                  itemWidth={itemWidth}
                />
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
