import desktop from "../assets/desktop.png";
import desktopVideo from "../assets/desktopvideo.m4v";
import deviceVideo from "../assets/deviceVideo.m4v";
import strangerthings from "../assets/strangerthings.png";
import devicepile from "../assets/devicepile.png";
import kids from "../assets/kids.png";
import phone from "../assets/phone.jpeg";
import FAQ from "./FAQ";
import {
  FrontPageContainer,
  HeaderCard,
  RedButton,
  CardText,
  SignUpForm,
  FormInput,
  OurStoryCard,
  AnimationCard,
  CardTextLeft,
  CardAnimation1,
  CardAnimation2,
  DownloadAnimation,
  CardImgContainer,
  SignIn,
} from "./FrontPage.styled";
import { NavBar } from "../components/NavBar";
import PosterBackground from "../components/PosterBackground";
import TextField from "../components/TextField";
import { validateEmail } from "../utils";

const FrontPage = () => {
  const emailValidator = (input: string) => {
    if (!input) throw new Error("Email is required!");
    else if (!validateEmail(input))
      throw new Error("Please enter a valid email address");
  };

  return (
    <>
      <FrontPageContainer>
        <HeaderCard>
          <NavBar>
            <div className="signin">
              <SignIn href="/login">Sign In</SignIn>
            </div>
          </NavBar>
          <OurStoryCard>
            <PosterBackground mode={"card"} />
            <CardText>
              <h1>Unlimited movies, TV shows, and more.</h1>
              <h2>Watch anywhere. Cancel anytime.</h2>
              <SignUpForm>
                <h3>
                  Ready to watch? Enter your email to create or restart your
                  membership.
                </h3>
                <FormInput>
                  <TextField
                    label={"Email address"}
                    validator={emailValidator}
                  />
                  <div>
                    <RedButton>Get Started &gt;</RedButton>
                  </div>
                </FormInput>
              </SignUpForm>
            </CardText>
          </OurStoryCard>
        </HeaderCard>
        <OurStoryCard>
          <AnimationCard>
            <CardTextLeft>
              <h1>Enjoy on your TV.</h1>
              <h2>
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
                Blu-ray players, and more.
              </h2>
            </CardTextLeft>
            <CardImgContainer>
              <img className="right" src={desktop} />
              <CardAnimation1>
                <video autoPlay playsInline muted loop>
                  <source src={desktopVideo} type="video/mp4" />
                </video>
              </CardAnimation1>
            </CardImgContainer>
          </AnimationCard>
        </OurStoryCard>
        <OurStoryCard>
          <AnimationCard>
            <CardImgContainer>
              <img className="left" src={phone} />
              <DownloadAnimation>
                <img src={strangerthings} />
                <div className="title">
                  <div className="text1">Stranger Things</div>
                  <div className="text2">Downloading...</div>
                </div>
                <div className="gif" />
              </DownloadAnimation>
            </CardImgContainer>
            <CardTextLeft>
              <h1>Download your shows to watch offline.</h1>
              <h2>
                Save your favorites easily and always have something to watch.
              </h2>
            </CardTextLeft>
          </AnimationCard>
        </OurStoryCard>
        <OurStoryCard>
          <AnimationCard>
            <CardTextLeft>
              <h1>Watch everywhere.</h1>
              <h2>
                Steam unlimited movies and TV shows on your phone, tablet,
                laptop, and TV without paying more.
              </h2>
            </CardTextLeft>
            <CardImgContainer>
              <img className="right" src={devicepile} />
              <CardAnimation2>
                <video autoPlay playsInline muted loop>
                  <source src={deviceVideo} type="video/mp4" />
                </video>
              </CardAnimation2>
            </CardImgContainer>
          </AnimationCard>
        </OurStoryCard>
        <OurStoryCard>
          <AnimationCard>
            <CardImgContainer>
              <img className="left" src={kids} />
            </CardImgContainer>
            <CardTextLeft>
              <h1>Create profiles for kids.</h1>
              <h2>
                Send kids on adventures with their favorite characters in a
                space made just for them—free with your membership.
              </h2>
            </CardTextLeft>
          </AnimationCard>
        </OurStoryCard>
        <OurStoryCard>
          <CardText>
            <h1 className="title-only">Frequently Asked Questions</h1>
            <FAQ />
            <SignUpForm>
              <h3>
                Ready to watch? Enter your email to create or restart your
                membership.
              </h3>
              <FormInput>
                <TextField label={"Email address"} validator={emailValidator} />
                <div>
                  <RedButton>Get Started &gt;</RedButton>
                </div>
              </FormInput>
            </SignUpForm>
          </CardText>
        </OurStoryCard>
      </FrontPageContainer>
    </>
  );
};

export default FrontPage;
