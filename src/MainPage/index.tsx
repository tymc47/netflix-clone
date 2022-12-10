import { useEffect, useState } from "react";
import { NavBar_Main } from "../components/NavBar";
import { getOneMovie } from "../services/TMDB";
import { Movie } from "../types";
import { MainPageContainer, SliderContainer } from "./Mainpage.styled";
import Billboard from "./Billboard";
import RowSlider from "./RowSlider";

const MainPage = () => {
  const [billboard, setBillboard] = useState<Movie | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 0);
    });
  });

  useEffect(() => {
    getOneMovie().then((data: Movie) => setBillboard(data));
  }, []);

  return (
    <MainPageContainer>
      <NavBar_Main scrolled={isScrolled} />
      <Billboard billboardMovie={billboard} />
      <SliderContainer>
        <RowSlider />
      </SliderContainer>
      <div style={{ height: "2000px" }}>Hello</div>
    </MainPageContainer>
  );
};

export default MainPage;
