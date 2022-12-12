import { useEffect, useState } from "react";
import { NavBar_Main } from "../components/NavBar";
import { getShowForBillboard, sliderOptions } from "../services/TMDB";
import { Movie, SliderFilter, Tab } from "../types";
import { MainPageContainer, SliderContainer } from "./Mainpage.styled";
import Billboard from "./Billboard";
import RowSlider from "./RowSlider";
import { rearrangeSliders } from "../utils";

const MainPage = ({ tab }: { tab: Tab }) => {
  const [billboard, setBillboard] = useState<Movie | null>(null);
  const [sliders, setSliders] = useState<SliderFilter[]>([]);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 0);
    });
  });

  useEffect(() => {
    console.log("changing tab");
    getShowForBillboard(tab).then((data: Movie) => setBillboard(data));
    const shuffledOptions = rearrangeSliders(sliderOptions);
    setSliders(shuffledOptions);
    window.scrollTo(0, 0);
  }, [tab]);

  return (
    <MainPageContainer>
      <NavBar_Main scrolled={isScrolled} />
      <Billboard billboardMovie={billboard} />
      <SliderContainer>
        {sliders.length !== 0
          ? sliders.map((slider: SliderFilter, index) => (
              <RowSlider key={index} filter={slider} tab={tab} />
            ))
          : null}
      </SliderContainer>
    </MainPageContainer>
  );
};

export default MainPage;
