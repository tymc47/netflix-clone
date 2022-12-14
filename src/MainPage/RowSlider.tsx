import { useState } from "react";
import styled, { CSSProperties } from "styled-components";
import { Show } from "../types";
import SliderCard from "./SliderCard";
import { BsChevronCompactLeft as Left_icon } from "react-icons/bs";
import { BsChevronCompactRight as Right_icon } from "react-icons/bs";
import { useSlider } from "../utils/hooks";
import devices from "../utils/devices";

const RowContainer = styled.div`
  position: relative;
  width: 100vw;
  padding-bottom: 1rem;
  overflow-x: hidden;

  div.row-header {
    margin: 0.5rem 4vw 0.5rem;

    @media ${devices.medium} {
      margin: 0.5rem 7vw 0.5rem;
    }

    h2 {
      line-height: 1.3;
      margin: 0;
    }
  }
`;

const Slider = styled.div`
  position: relative;
  padding: 0 4vw;
  white-space: nowrap;

  @media ${devices.medium} {
    padding: 0 7vw;
  }

  &:hover div.slider-control {
    svg {
      opacity: 1;
    }
  }

  div.slider-control {
    position: absolute;
    height: 100%;
    width: calc(4vw - 5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 12;
    background: hsla(0, 0%, 8%, 0.5);
    border-radius: 4px 0 4px 0;
    opacity: 1;
    cursor: pointer;

    @media ${devices.medium} {
      width: calc(7vw - 4px);
    }

    &:hover svg {
      transform: scale(1.5);
    }

    svg {
      fill: white;
      font-size: 3rem;
      opacity: 0;
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

export interface SliderProps {
  style: CSSProperties;
}

const RowSlider = ({ filter, shows }: { filter: string; shows: Show[] }) => {
  const [showArrow, setShowArrow] = useState<boolean>(true);
  const {
    containerRef,
    displayItems,
    itemWidth,
    handleLeftClick,
    handleRightClick,
    sliderProps,
    isMoved,
  } = useSlider(shows);

  if (shows.length === 0) return <></>;

  return (
    <RowContainer>
      <div className="row-header">
        <h2>{filter}</h2>
      </div>
      <Slider>
        {isMoved && (
          <div className="slider-control left" onClick={handleLeftClick}>
            {showArrow && <Left_icon />}
          </div>
        )}
        <SliderContent ref={containerRef} {...sliderProps}>
          {displayItems.length !== 0
            ? displayItems.map((show: Show) => (
                <SliderCard
                  key={`${filter}${show.id}`}
                  show={show}
                  itemWidth={itemWidth}
                  toggleArrow={(show: boolean) => {
                    setShowArrow(show);
                  }}
                />
              ))
            : null}
        </SliderContent>

        <div className="slider-control right" onClick={handleRightClick}>
          {showArrow && <Right_icon />}
        </div>
      </Slider>
    </RowContainer>
  );
};

export default RowSlider;
