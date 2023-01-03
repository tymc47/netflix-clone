import React, { useRef, useState, useEffect } from "react";
import { CSSProperties } from "styled-components";
import { TextFieldMode, TextFieldType } from "../components/TextField";
import { SliderProps } from "../MainPage/RowSlider";
import { useStateValue } from "../state";
import { Show } from "../types";
import { rotateMovieArray, validateEmail, validatePhone } from "./helpers";

interface SliderHook {
  containerRef: React.RefObject<HTMLDivElement>;
  itemWidth: number;
  handleLeftClick: () => void;
  handleRightClick: () => void;
  sliderProps: SliderProps;
  isMoved: boolean;
  displayItems: Show[];
}

export const useSlider = (items: Show[], displayCount: number): SliderHook => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [allItems, setAllItems] = useState<Show[]>([]);
  const [displayItems, setDisplayItems] = useState<Show[]>([]);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [animationStyle, setAnimationStyle] = useState<CSSProperties>({});
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
    setAnimationStyle({ transform: `translateX(0px)` });
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

interface TextFieldHook {
  label: string;
  mode: TextFieldMode;
  type: TextFieldType;
  value: string;
  errMsg: string;
  handleInput: (event: React.FormEvent<HTMLInputElement>) => void;
  handleEmptySubmit: () => void;
}

export const useTextField = (
  label: string,
  mode: TextFieldMode,
  type: TextFieldType
): TextFieldHook => {
  const [value, setValue] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [{ account }] = useStateValue();

  useEffect(() => {
    if (type === "account" && account) {
      setValue(account);
    }
  }, []);

  const usernameValidator = (input: string) => {
    if (!input) throw new Error("Please enter a valid email or phone number");
    else if (/.*[a-zA-Z].*/.test(input)) {
      if (!validateEmail(input)) throw new Error("Please enter a valid email.");
    } else if (!validatePhone(input))
      throw new Error("Please enter a valid phone number");
  };

  const passwordValidator = (input: string) => {
    if (input.length < 4 || input.length > 60)
      throw new Error(
        "Your password must contain between 4 and 60 characters."
      );
  };

  const emailValidator = (input: string) => {
    if (!input || !validateEmail(input))
      throw new Error("Please enter a valid email");
  };

  const validator = (input: string = value) => {
    try {
      if (mode === "signin") {
        if (type === "account") usernameValidator(input);
        else passwordValidator(input);
      } else {
        if (type === "account") emailValidator(input);
        if (type === "password" && !input)
          throw new Error("Password is required");
        if (type === "password") passwordValidator(input);
      }
      setErrMsg("");
    } catch (error) {
      if (error instanceof Error) setErrMsg(error.message);
    }
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    setValue(input);

    validator(input);
  };

  const handleEmptySubmit = () => {
    validator();
  };

  return {
    label,
    mode,
    type,
    value,
    errMsg,
    handleInput,
    handleEmptySubmit,
  };
};
