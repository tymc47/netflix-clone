import styled from "styled-components";
import downloadgif from "../assets/downloadgif.gif";

export const FrontPageContainer = styled.div`
  position: relative;
  width: 100%;
  font-family: "Netflix Sans Light";
`;

export const HeaderCard = styled.div`
  height: 700px;
  box-sizing: border-box;
`;

export const OurStoryCard = styled.div`
  width: 100%;
  padding: 70px 45px;
  background: transparent;
  color: white;
  box-sizing: border-box;
  border-bottom: 8px solid #323232;
`;

export const AnimationCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto;
`;

export const CardImgContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  height: 100%;
  width: 45%;

  img.right {
    margin: -5% -5% 0% 0;
    position: relative;
    overflow: hidden;
    z-index: 2;
  }

  img.left {
    margin: -7% 5% -5% 0;
    position: relative;
    overflow: hidden;
    z-index: 2;
  }
`;

export const CardText = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 75px 0;
  width: 100% !important;
  text-align: center;
  z-index: 10;

  h1 {
    font-family: "Netflix Sans";
    font-size: 3.725rem;
    line-height: 1.1;
    max-width: 700px;
    margin: 0 auto;
    font-weight: 500;
  }

  h2 {
    margin: 1rem auto;
    font-size: 1.625rem;
    max-width: 800px;
    font-weight: 100;
  }

  h1.title-only {
    font-size: 3rem;
  }
`;

export const CardTextLeft = styled(CardText)`
  text-align: left;
  padding: 0 3rem 0 0;

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 1.5rem;
  }
`;

export const CardAnimation1 = styled.div`
  position: absolute;
  max-height: 66%;
  max-width: 75%;
  overflow: hidden;
  top: 10%;
  right: 10%;
`;

export const CardAnimation2 = styled(CardAnimation1)`
  max-height: 42%;
  max-width: 65%;
  top: 7%;
  left: 20%;
`;

export const DownloadAnimation = styled.div`
  padding: 0.5em 0.75em;
  display: flex;
  align-items: center;
  background: #000;
  border: 2px solid hsla(0, 0%, 100%, 0.25);
  border-radius: 0.75em;
  position: absolute;
  z-index: 10;
  width: 60%;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);

  img {
    margin: 0 1em 0 0;
    height: 4.5em;
  }

  div.title {
    flex: 1;
  }

  div.text1 {
    font-size: 1rem;
  }

  div.text2 {
    font-size: 0.9rem;
    color: #0071eb;
  }

  div.gif {
    height: 3em;
    background: url(${downloadgif}) 50% no-repeat;
    background-size: 100%;
    width: 3em;
  }
`;

export const SignUpForm = styled.form`
  margin-top: 30px;

  h3 {
    margin: 0 auto;
    padding: 0 5% 20px 5%;
  }
`;

export const FormInput = styled.div`
  max-width: 700px;
  margin: 0 auto;
  display: flex;

  div {
    width: 30%;
  }
`;

export const RedButton = styled.button`
  background-color: rgb(229, 9, 20);
  background-image: linear-gradient(180deg, #e50914, #db0510);
  color: white;
  border: none;
  font-family: "Netflix Sans Light";
  height: 60px;
  width: 100%;
  font-size: 1.625rem;
  border: 1px solid #333;
  cursor: pointer;
`;
