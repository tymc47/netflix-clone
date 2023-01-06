import React, { ReactElement, useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import styled from "styled-components";
import GlobalFonts from "./assets/fonts/fonts";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useMatch,
} from "react-router-dom";
import SignInPage from "./SignInPage";
import MainPage from "./MainPage";
import { setHomeData, setShowData, setUser, useStateValue } from "./state";
import { isTab, Tab } from "./types";
import SignUpPage from "./SignUpPage";
import userService from "./services/userService";
import WatchPage from "./WatchPage";
import tmdbService from "./services/tmdbService";

const AppMount = styled.div`
  max-width: 100vw;
  background-color: black;
  font-family: "Netflix Sans Light";
`;

const RequireAuth = ({ children }: { children: ReactElement }) => {
  const [{ user }] = useStateValue();

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [tab, setTab] = useState<Tab>("home");
  const navigate = useNavigate();
  const match = useMatch<"tab", string>("/browse/:tab");

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("netflix-cloneUser");
    const loggedUserList = window.localStorage.getItem(
      "netflix-cloneUser-List"
    );
    if (loggedUser && loggedUserList) {
      const user = JSON.parse(loggedUser);
      const mylist = JSON.parse(loggedUserList);
      userService.setToken(user.token);
      dispatch(setUser({ ...user, mylist }));
      navigate("/browse");
    }
  }, []);

  useEffect(() => {
    if (match) {
      const tab = match.params.tab;
      if (isTab(tab)) setTab(tab);
    }
  }, [match]);

  useEffect(() => {
    const showsFilters = tmdbService.sliderOptions;
    for (const filter of showsFilters) {
      if (filter.movieUrl)
        tmdbService.getShowsLists(filter.movieUrl).then((data) => {
          if (data) {
            dispatch(setShowData(data, filter.filter));
            dispatch(setHomeData(data, filter.filter));
          }
        });
      if (filter.tvUrl)
        tmdbService.getShowsLists(filter.tvUrl).then((data) => {
          if (data) {
            dispatch(setShowData(data, filter.filter));
            dispatch(setHomeData(data, filter.filter));
          }
        });
    }
  }, []);

  return (
    <AppMount>
      <GlobalFonts />
      <Routes>
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/browse/:tab"
          element={
            <RequireAuth>
              <MainPage tab={tab} />
            </RequireAuth>
          }
        />
        <Route
          path="/watch/movie/:id"
          element={
            <RequireAuth>
              <WatchPage type={"movie"} />
            </RequireAuth>
          }
        />
        <Route
          path="/watch/tv/:id"
          element={
            <RequireAuth>
              <WatchPage type={"tv"} />
            </RequireAuth>
          }
        />
        <Route
          path="/browse/"
          element={
            <RequireAuth>
              <MainPage tab={"home"} />
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={user ? <Navigate replace to="/browse" /> : <LandingPage />}
        />
      </Routes>
    </AppMount>
  );
}

export default App;
