import { useRef, useState, useEffect } from "react";
import { Movie } from "./types";
import { rotateMovieArray } from "./utils";

export const useSlider = (items: Movie[], displayCount: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [allItems, setAllItems] = useState<Movie[]>([]);
  const [displayItems, setDisplayItems] = useState<Movie[]>([]);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [animationStyle, setAnimationStyle] = useState({});
  const [isMoved, setIsMoved] = useState<boolean>(false);

  const setWidth = () => {
    if (containerRef.current) {
      const newContainerWidth = containerRef.current.clientWidth;
      const newItemWidth = newContainerWidth / displayCount;

      setContainerWidth(newContainerWidth);
      setItemWidth(newItemWidth);
    }
  };

  useEffect(() => {
    setWidth();
  }, [containerRef.current]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth();
    });
  }, []);

  useEffect(() => {
    if (isMoved)
      setAnimationStyle({
        transform: `translateX(${-containerWidth - itemWidth}px)`,
      });
  }, [containerWidth]);

  useEffect(() => {
    setAllItems(items);
    setDisplayItems(items.slice(0, displayCount * 3 + 2));
  }, [items]);

  const handleLeftClick = () => {
    setAnimationStyle({
      transform: `translateX(${0 - itemWidth}px)`,
      transition: "transform 0.5s",
    });
    const newItems = rotateMovieArray(-displayCount, allItems);
    setTimeout(() => {
      setAllItems(newItems);
      setDisplayItems(newItems.slice(0, displayCount * 3 + 2));
      setAnimationStyle({
        transform: `translateX(${-containerWidth - itemWidth}px)`,
      });
    }, 500);
    setIsMoved(true);
  };

  const handleRightClick = () => {
    let rotate = 0,
      offset = 0;
    if (isMoved) {
      offset = -containerWidth * 2 - itemWidth;
      rotate = displayCount;
    } else {
      offset = -containerWidth;
      rotate = -1;
    }

    setAnimationStyle({
      transform: `translateX(${offset}px)`,
      transition: "transform 0.5s",
    });
    const newItems = rotateMovieArray(rotate, allItems);
    setTimeout(() => {
      setAllItems(newItems);
      setDisplayItems(newItems.slice(0, displayCount * 3 + 2));
      setAnimationStyle({
        transform: `translateX(${
          isMoved ? offset + containerWidth : offset - itemWidth
        }px)`,
      });
    }, 500);
    setIsMoved(true);
  };

  const sliderProps = {
    style: animationStyle,
  };

  return {
    containerRef,
    itemWidth,
    handleLeftClick,
    handleRightClick,
    sliderProps,
    isMoved,
    displayItems,
  };
};
