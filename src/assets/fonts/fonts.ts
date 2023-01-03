import { createGlobalStyle } from "styled-components";
import NetflixSans from "./NetflixSansMedium.otf";
import NetflixSansLight from "./NetflixSansLight.otf";

export default createGlobalStyle`
@font-face {
    font-family: "Netflix Sans";
    src: url(${NetflixSans}) format('opentype');
    font-weight: 300;
    font-style: normal;
}
@font-face {
    font-family: "Netflix Sans Light";
    src: url(${NetflixSansLight}) format('opentype');
    font-weight: 200;
    font-style: normal;
}
    `;
