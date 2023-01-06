import { AxiosError } from "axios";
import { useState } from "react";
import { NavBar, SignIn } from "../components/NavBar";
import TextField from "../components/TextField";
import { useTextField } from "../utils/hooks";
import { RedButton } from "../LandingPage/LandingPage.styled";
import userService from "../services/userService";
import {
  FormField,
  SignUpForm,
  SignUpFormContainer,
  SignUpPageContainer,
} from "./SingUpPage.styled";
import { IoWarningOutline as Warning_icon } from "react-icons/io5";
import { setUser, useStateValue } from "../state";
import { signIn } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [errMsg, setErrMsg] = useState<string>("");
  const [, dispatch] = useStateValue();
  const email = useTextField("Email", "signup", "account");
  const password = useTextField("Add a password", "signup", "password");
  const navigate = useNavigate();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.value || !password.value) {
      email.handleEmptySubmit();
      password.handleEmptySubmit();
      return;
    }
    if (email.errMsg || password.errMsg) return;

    try {
      const newUser = await userService.createUser({
        username: email.value,
        password: password.value,
      });
      dispatch(setUser(newUser));
      signIn(newUser);
      navigate("/browse");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data.error) {
          const error = err.response?.data.error as string;
          if (error.includes("unique"))
            setErrMsg(
              "Looks like that account already exists. Sign into that account or try using a different email."
            );
          else setErrMsg(error);
        }
      }
    }
  };

  return (
    <SignUpPageContainer>
      <NavBar className="signup-page">
        <SignIn to="/login" className="signup">
          Sign In
        </SignIn>
      </NavBar>
      <SignUpFormContainer>
        <SignUpForm>
          {errMsg ? (
            <div className="error-message">
              <div>
                <Warning_icon />
              </div>
              <h4>{errMsg}</h4>
            </div>
          ) : null}
          <h1>Create a password to start your membership</h1>
          <h3>Just a few more steps and you&apos;re done!</h3>
          <h3>We hate paperwork, too</h3>
          <FormField>
            <TextField {...email} />
            <TextField {...password} />
            <RedButton onClick={handleSignUp} className="signup">
              Sign Up
            </RedButton>
          </FormField>
        </SignUpForm>
      </SignUpFormContainer>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
