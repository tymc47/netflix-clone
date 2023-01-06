import React, { useRef, useState } from "react";
import { Show } from "../types";
import { BsPlayFill as Play_icon } from "react-icons/bs";
import { BsPlusLg as Add_icon } from "react-icons/bs";
import { BsCheckLg as Check_icon } from "react-icons/bs";
import { BsFillHandThumbsUpFill as Like_icon } from "react-icons/bs";
import { BsChevronDown as Expand_icon } from "react-icons/bs";
import userService from "../services/userService";
import { updateMyList, useStateValue } from "../state";
import {
  SliderCardContainer,
  HoverCard,
  CardButton,
} from "./SliderCard.styled";
import { useNavigate } from "react-router-dom";

const imageUrl = process.env.REACT_APP_IMG_URL;

interface SliderCardProps {
  show: Show;
  itemWidth: number;
  toggleArrow: (hide: boolean) => void;
}

const SliderCard = ({ show, itemWidth, toggleArrow }: SliderCardProps) => {
  const [{ mylist }, dispatch] = useStateValue();
  const [delayHandler, setDelayHandler] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoverImg, setHoverImg] = useState<boolean>(false);
  const [offset, setOffset] = useState<React.CSSProperties>({
    left: "-110px",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const setHoverCardPosition = () => {
    if (containerRef.current) {
      const { x, right } = containerRef.current.getBoundingClientRect();
      const offsetRight = window.innerWidth - right;
      if (x < window.innerWidth * 0.04 + 10) setOffset({ left: `0px` });
      else if (offsetRight < window.innerWidth * 0.04 + 10)
        setOffset({ right: `0px` });
    }
  };

  const handleMouseEnter = () => {
    setHoverCardPosition();
    setDelayHandler(
      setTimeout(() => {
        setIsHovered(true);
        toggleArrow(false);
      }, 500)
    );
  };

  const handleMouseLeave = () => {
    if (delayHandler) clearTimeout(delayHandler);
    setHoverImg(false);
    setIsHovered(false);
    toggleArrow(true);
  };

  const handleToggleMyList = async () => {
    try {
      const { newList } = await userService.toggleMyList(show);
      window.localStorage.setItem(
        "netflix-cloneUser-List",
        JSON.stringify(newList)
      );
      dispatch(updateMyList(newList));
    } catch (err) {
      alert("Unknown error occurred. Please try again later");
      console.error(err);
    }
  };

  const handlePlay = () => {
    handleMouseLeave();
    navigate(`/watch/${show.type}/${show.id}`);
  };

  return (
    <SliderCardContainer
      itemWidth={itemWidth}
      className={isHovered ? "hover" : ""}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <img
        onClick={handlePlay}
        className="poster"
        key={show.id}
        src={`${imageUrl}/w500${show.poster_path}`}
        alt={show.type === "movie" ? show.title : show.name}
      />

      {isHovered && (
        <HoverCard
          style={hoverImg ? offset : { display: "none" }}
          initialPosition={{
            left: offset.left ? 0 : "auto",
            right: offset.left ? "auto" : 0,
          }}
        >
          <div className="hover-card-poster">
            <img
              className="hover-poster"
              key={show.id}
              src={`${imageUrl}/w500${show.poster_path}`}
              alt={show.type === "movie" ? show.title : show.name}
              onLoad={() => setHoverImg(true)}
            />
          </div>
          <div className="hover-card-content">
            <div className="card-info">
              <h4>{show.type === "movie" ? show.title : show.name}</h4>
            </div>
            <div className="button-grp">
              <CardButton className="checked" onClick={handlePlay}>
                <span className="tooltiptext">Play</span>
                <Play_icon />
              </CardButton>
              {!mylist.some((item) => item.id === show.id) ? (
                <CardButton onClick={handleToggleMyList}>
                  <span className="tooltiptext">Add to My List</span>

                  <Add_icon />
                </CardButton>
              ) : (
                <CardButton className="checked" onClick={handleToggleMyList}>
                  <span className="tooltiptext">Remove from My List</span>

                  <Check_icon />
                </CardButton>
              )}
              <CardButton>
                <span className="tooltiptext">Dummy Button</span>

                <Like_icon />
              </CardButton>
              <CardButton>
                <span className="tooltiptext">Dummy Button</span>

                <Expand_icon />
              </CardButton>
            </div>
          </div>
        </HoverCard>
      )}
    </SliderCardContainer>
  );
};

export default SliderCard;
