import React from "react";
import FrontPage from "./LandingPage";
import styled from "styled-components";
import GlobalFonts from "./fonts/fonts";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./SignInPage";
import MainPage from "./MainPage";

const AppMount = styled.div`
  max-width: 100vw;
  background-color: black;
  font-family: "Netflix Sans Light";
`;

function App() {
  return (
    <AppMount>
      <GlobalFonts />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/browse" element={<MainPage />} />
      </Routes>
    </AppMount>
  );
}

export default App;
