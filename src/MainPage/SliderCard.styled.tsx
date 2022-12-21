import styled, { keyframes } from "styled-components";

interface Offset {
  left: number | "auto";
  right: number | "auto";
}
const cardInAnimation = (offset: Offset) => keyframes`
  0% {
    top: 0;
    height: 100%;
    width: 100%;
    left: ${offset.left};
    right: ${offset.right};
  }

  100% {
    top: -7.5%;
    height: 110%;
    width: 200%;
  }
`;

export const SliderCardContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 5px;
  transition: all 0.3s ease-in-out;

  img.poster {
    width: ${({ itemWidth }: { itemWidth: number }) => `${itemWidth - 10}px`};
    min-height: ${({ itemWidth }: { itemWidth: number }) =>
      `${((itemWidth - 10) / 2) * 3}px`};
    object-fit: cover;
    border-radius: 4px;
  }
`;

interface HoverCardProps {
  initialPosition: Offset;
}

export const HoverCard = styled.div`
  position: absolute;
  box-sizing: border-box;
  border: 1px solid #8c8c8c;
  border-radius: 4px;
  display: flex;
  z-index: 22;
  top: -7.5%;
  height: 110%;
  width: 200%;
  animation: ${(props: HoverCardProps) =>
      cardInAnimation(props.initialPosition)}
    0.15s ease-in;

  div.hover-card-poster {
    z-index: 25;
    img.hover-poster {
      height: 100%;
      border-radius: 4px 0 0 4px;
      object-fit: cover;
    }
  }

  div.hover-card-content {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #141414;
    border-radius: 0px 4px 4px 0;
    white-space: normal;
    padding: 10px 15px;
    flex: 1;
    min-width: 0;
    z-index: 26;

    div.card-info {
      flex: 1;
    }
    div.button-grp {
      min-height: 20%;
      display: flex;
      flex-wrap: wrap;

      justify-content: space-between;
    }
  }
`;

export const CardButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  width: 30px;

  border: 2px solid #8c8c8c;
  border-radius: 50%;

  &.checked {
    border-color: white;
  }

  &:hover {
    transform: scale(1.2);
    border-color: white;
  }

  &:hover span.tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  span.tooltiptext {
    visibility: hidden;
    width: 100px;
    background-color: #555;
    font-size: 0.7rem;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    position: absolute;
    z-index: 99;
    bottom: 125%;
    left: 50%;
    margin-left: -50px;

    opacity: 0;
    transition: opacity 0.3s;
  }

  span.tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`;
