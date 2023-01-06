import { useEffect, useState } from "react";
import { NavBar_Main } from "../components/NavBar";
import tmdbService from "../services/tmdbService";
import { Show, Tab } from "../types";
import { MainPageContainer, SliderContainer } from "./Mainpage.styled";
import Billboard from "./Billboard";
import RowSlider from "./RowSlider";
import { rearrangeShowByFilter, signOut } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { removeUser, ShowByFilter, useStateValue } from "../state";
import MyList from "./MyList";

interface MainPageProps {
  tab: Tab;
}

const MainPage = ({ tab }: MainPageProps) => {
  const [{ tvshowData, movieData, homeData }, dispatch] = useStateValue();
  const [displayContent, setDisplayContent] = useState<ShowByFilter[]>([]);
  const [billboard, setBillboard] = useState<Show | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 0);
    });
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (tab === "tvshows") setDisplayContent(rearrangeShowByFilter(tvshowData));
    if (tab === "movies") setDisplayContent(rearrangeShowByFilter(movieData));
    if (tab === "home") setDisplayContent(rearrangeShowByFilter(homeData));

    tmdbService
      .getShowForBillboard(tab)
      .then((data: Show | null) => setBillboard(data));
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
            {displayContent.length !== 0 &&
              displayContent.map((data, index) => (
                <RowSlider
                  key={index}
                  filter={data.filter}
                  shows={data.shows}
                />
              ))}
          </SliderContainer>
        </>
      ) : (
        <MyList />
      )}
    </MainPageContainer>
  );
};

export default MainPage;
