import { NavBar } from "../components/NavBar";
import { RedButton } from "../LandingPage/LandingPage.styled";
import React, { useState } from "react";
import PosterBackground from "../components/PosterBackground";
import {
  SignInContainer,
  SignInForm,
  RememberMe,
  FormOther,
  SignInPageContainer,
} from "./SignInPage.styled";
import TextField from "../components/TextField";
import { useTextField } from "../utils/hooks";
import loginService from "../services/loginService";
import { setUser, useStateValue } from "../state";
import { signIn } from "../utils/helpers";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
  const [, dispatch] = useStateValue();
  const [errMsg, setErrMsg] = useState<string>("");
  const username = useTextField("Email or phone number", "signin", "account");
  const password = useTextField("Password", "signin", "password");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (username.errMsg || password.errMsg) return;
    if (!username.value || !password.value) {
      username.handleEmptySubmit();
      password.handleEmptySubmit();
      return;
    }

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });
      signIn(user);
      dispatch(setUser(user));
      setErrMsg("");
      navigate("/browse");
    } catch (err) {
      console.log(err);
      setErrMsg("Wrong credentials");
      password.value = "";
    }
  };

  return (
    <SignInPageContainer>
      <PosterBackground mode={"fullscreen"} />
      <NavBar className="signin-page" />
      <SignInContainer>
        <SignInForm>
          <h1>Sign In</h1>

          {errMsg !== "" ? <div className="error-message">{errMsg}</div> : null}
          <form>
            <TextField {...username} />
            <TextField {...password} />

            <RedButton onClick={handleLogin} className="signin">
              Sign In
            </RedButton>
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
            <Link to="/">Sign up now.</Link>
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
    </SignInPageContainer>
  );
};

export default SignInPage;
