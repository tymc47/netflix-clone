import { useEffect, useState } from "react";
import { NavBar_Main } from "../components/NavBar";
import tmdbService from "../services/tmdbService";
import { Show, SliderFilter, Tab } from "../types";
import { MainPageContainer, SliderContainer } from "./Mainpage.styled";
import Billboard from "./Billboard";
import RowSlider from "./RowSlider";
import { rearrangeSliders, signOut } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { removeUser, useStateValue } from "../state";
import MyList from "./MyList";

interface MainPageProps {
  tab: Tab;
}

const MainPage = ({ tab }: MainPageProps) => {
  const [, dispatch] = useStateValue();
  const [billboard, setBillboard] = useState<Show | null>(null);
  const [sliders, setSliders] = useState<SliderFilter[]>([]);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 0);
    });
  });

  useEffect(() => {
    console.log("changing tab to", tab);
    tmdbService
      .getShowForBillboard(tab)
      .then((data: Show | null) => setBillboard(data));
    const shuffledOptions = rearrangeSliders(tmdbService.sliderOptions);
    setSliders(shuffledOptions);
    window.scrollTo(0, 0);
  }, [tab]);

  const handleLogout = () => {
    dispatch(removeUser());
    signOut();
    navigate("/");
  };
  return (
    <MainPageContainer>
      <NavBar_Main scrolled={isScrolled} handleLogout={handleLogout} />
      {tab !== "mylist" ? (
        <>
          <Billboard billboardMovie={billboard} />
          <SliderContainer>
            {sliders.length !== 0
              ? sliders.map((slider: SliderFilter, index) => (
                  <RowSlider key={index} filter={slider} tab={tab} />
                ))
              : null}
          </SliderContainer>
        </>
      ) : (
        <MyList />
      )}
    </MainPageContainer>
  );
};

export default MainPage;
