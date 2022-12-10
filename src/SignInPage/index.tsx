import { NavBar } from "../components/NavBar";
import { RedButton } from "../LandingPage/FrontPage.styled";
import { useState } from "react";
import PosterBackground from "../components/PosterBackground";
import {
  SignInContainer,
  SignInForm,
  RememberMe,
  FormOther,
} from "./SignInPage.styled";
import TextField from "../components/TextField";
import { validateEmail } from "../utils";

const SignInPage = () => {
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);

  const usernameValidator = (input: string) => {
    if (!input) throw new Error("Please enter a valid email or phone number");
    else if (!validateEmail(input))
      throw new Error("Please enter a valid email.");
  };

  const passwordValidator = (input: string) => {
    if (input.length < 4 || input.length > 60)
      throw new Error(
        "Your password must contain between 4 and 60 characters."
      );
  };

  return (
    <div>
      <PosterBackground mode={"fullscreen"} />
      <NavBar />
      <SignInContainer>
        <SignInForm>
          <h1>Sign In</h1>
          <form>
            <TextField
              label={"Email or phone number"}
              validator={usernameValidator}
              mode={"signin"}
            />
            <TextField
              label={"Password"}
              validator={passwordValidator}
              mode={"password"}
            />

            <RedButton>Sign In</RedButton>
            <div className="login-help">
              <RememberMe>
                <input type="checkbox" id="remember-me"></input>
                <label htmlFor="remember-me">
                  <span className="remember-me-text">Remember me</span>
                </label>
              </RememberMe>

              <a>Need help?</a>
            </div>
          </form>
        </SignInForm>
        <FormOther>
          <div>
            {"New to Netflix? "}
            <a href="/">Sign up now.</a>
          </div>
          <div className="disclaimer">
            <p>
              <span>
                This page is protected by Google reCAPTCHA to ensure you&apos;re
                not a bot.&nbsp;
                <button
                  className={showDisclaimer ? "hide" : ""}
                  onClick={() => setShowDisclaimer(true)}
                >
                  Learn more.
                </button>
              </span>
            </p>
            <div className={showDisclaimer ? "disclaimer-text" : "hide"}>
              <span>
                {
                  "The information collected by Google reCAPTCHA is subject to the Google "
                }
                <a>Privacy Policy</a>
                {" and "}
                <a>Terms of Service</a>
                {
                  ", and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google)."
                }
              </span>
            </div>
          </div>
        </FormOther>
      </SignInContainer>
    </div>
  );
};

export default SignInPage;
