import styled from "styled-components";
import downloadgif from "../assets/downloadgif.gif";
import devices from "../utils/devices";

export const FrontPageContainer = styled.div`
  position: relative;
  width: 100%;
  font-family: "Netflix Sans Light";
  overflow: hidden;
`;

export const HeaderCard = styled.div`
  max-height: 700px;
  position: relative;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;

  @media ${devices.large} {
    height: 550px;
  }
`;

export const OurStoryCard = styled.div`
  width: 100%;
  padding: 70px 45px;
  background: transparent;
  color: white;
  box-sizing: border-box;
  border-bottom: 8px solid #323232;

  @media ${devices.large} {
    padding: 65px 40px;
    min-height: 478px;
  }

  @media ${devices.medium} {
    padding: 35px 20px;

    &.faq {
      padding: 35px 0px;
    }
  }
`;

export const AnimationCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  max-width: 1100px;
  margin: 0 auto;

  &.reverse {
    flex-direction: row-reverse;
  }

  @media ${devices.large} {
    max-width: 100%;
    flex-direction: column;
    text-align: center;

    &.reverse {
      flex-direction: column;
    }
  }
`;

export const CardImgContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  height: 100%;
  width: 450px;

  img.right {
    margin: -5% 0 0% 0;
    position: relative;
    overflow: hidden;
    z-index: 2;
  }

  img.left {
    margin: -7% 0 -5% 0;
    position: relative;
    overflow: hidden;
    z-index: 2;
  }

  @media ${devices.medium} {
    width: 350px;
  }
`;

export const CardText = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 75px 0;
  width: 100% !important;
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
    text-align: center;
    font-size: 3rem;
  }

  @media ${devices.large} {
    padding: 20px 0;

    h1 {
      font-size: 2.25rem;
      line-height: 1.1;
      margin: 0 auto;
    }

    h2 {
      margin: 1rem auto;
      font-size: 1.5rem;
    }

    h1.title-only {
      font-size: 1.725rem;
    }
  }

  @media ${devices.medium} {
    padding: 10px 0;

    h1 {
      font-size: 1.75rem;
      line-height: 1.1;
      margin: 0 auto;
    }

    h2 {
      margin: 0.75rem auto;
      font-size: 1rem;
    }

    h1.title-only {
      font-size: 1.25rem;
    }
  }
`;

export const CardAnimation1 = styled.div`
  display: flex;
  position: absolute;
  max-height: 66%;
  max-width: 75%;
  overflow: hidden;
  top: 15%;
  left: 15%;
  video {
    width: 100%;
  }
`;

export const CardAnimation2 = styled(CardAnimation1)`
  max-height: 50%;
  max-width: 100%;
  top: 7%;
  left: 0%;
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
  margin: 30px auto 0;
  text-align: center;
  max-width: 900px;

  h3 {
    margin: 0 auto;
    padding: 0 5% 20px 5%;
  }
`;

export const FormInput = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 80%;

  @media ${devices.large} {
    flex-direction: column;
  }

  @media ${devices.medium} {
    max-width: 100%;
    padding: 0 5%;
  }
`;

export const RedButton = styled.button`
  background-color: rgb(229, 9, 20);
  background-image: linear-gradient(180deg, #e50914, #db0510);
  color: white;
  border: none;
  font-family: "Netflix Sans Light";
  height: 60px;
  width: 250px;
  font-size: 1.625rem;
  border: 1px solid #333;
  cursor: pointer;

  @media ${devices.large} {
    width: 140px;
    height: 48px;
    font-size: 1rem;
  }

  @media ${devices.medium} {
    width: 120px;
    height: 40px;
    font-size: 0.8rem;
  }

  &.signin {
    width: 100%;
    font-size: 1rem;
  }

  &.signup {
    width: 100%;
    font-size: 1rem;
  }
`;
