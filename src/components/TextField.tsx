import styled from "styled-components";
import React, { useState } from "react";

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0;
  flex: 1 0 auto;

  input {
    line-height: 30px;
    border-radius: 2px;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 24px 16px 4px 16px;
    font-size: 16px;
    outline: none;
    box-shadow: none;
    transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }

  input.signin-form {
    line-height: 20px;
    background-color: #333;
  }

  input.error {
    border-bottom: 2px #e87c03 solid;
  }

  label {
    position: absolute;
    pointer-events: none;
    transform: translate(0, 23px) scale(1);
    transform-origin: top left;
    transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    color: rgb(140, 140, 140);
    font-size: 16px;
    line-height: 15px;
    left: 16px;
  }

  div.error {
    margin-top: 0.4rem;
    font-size: 0.9rem;
    color: #e87c03;
    text-align: left;
    width: 100%;
  }

  &:focus-within label {
    transform: translate(0, 12px) scale(0.8);
  }

  .filled {
    transform: translate(0, 12px) scale(0.8);
  }

  &.signin,
  &.password {
    padding-bottom: 16px;

    input {
      line-height: 20px;
      background-color: #333;
      color: white;
      border-radius: 4px;
    }

    div.error {
      margin-top: 0.4rem;
      font-size: 0.8rem;
      color: #e87c03;
      text-align: left;
      width: 100%;
    }

    label {
      top: -5px;
    }

    &:focus-within label {
      transform: translate(0, 12px) scale(0.7);
    }

    .filled {
      transform: translate(0, 12px) scale(0.7);
    }

    button.show-password {
      position: absolute;
      border: none;
      font-size: 14px;
      background: transparent;
      color: rgb(140, 140, 140);
      top: -22px;
      right: 0px;
      display: none;
    }

    &:focus-within button.show-password {
      display: block;
    }
  }
`;

interface TextFieldProps {
  label: string;
  validator: (input: string) => void;
  mode?: "signin" | "landingpage" | "signup" | "password";
}

const TextField = ({ validator, label, mode }: TextFieldProps) => {
  const [input, setInput] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    setInput(input);

    try {
      validator(input);
      setErrMsg("");
    } catch (error) {
      if (error instanceof Error) setErrMsg(error.message);
    }
  };

  const handleShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
    const buttonText = event.currentTarget.textContent;
    if (buttonText === "SHOW") event.currentTarget.textContent = "HIDE";
    else event.currentTarget.textContent = "SHOW";
  };

  return (
    <InputContainer className={mode}>
      <input
        className={errMsg && "error"}
        type={mode === "password" && !showPassword ? "password" : "text"}
        value={input}
        onChange={handleInput}
      ></input>
      {mode === "password" ? (
        <button className="show-password" onClick={handleShowPassword}>
          SHOW
        </button>
      ) : null}
      <label className={input && "filled"}>{label}</label>
      <div className="error">{errMsg}</div>
    </InputContainer>
  );
};

export default TextField;
