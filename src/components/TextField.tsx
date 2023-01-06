import styled from "styled-components";
import React, { useState } from "react";
import devices from "../utils/devices";

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

    @media ${devices.medium} {
      line-height: 25px;
      padding: 18px 10px 0 10px;
    }
  }

  input.signin-form {
    line-height: 20px;
    background-color: #333;
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

    @media ${devices.medium} {
      line-height: 0px;
      font-size: 15px;
      left: 10px;
    }
  }

  &:focus-within label {
    transform: translate(0, 12px) scale(0.8);
  }

  .filled {
    transform: translate(0, 12px) scale(0.8);
  }

  &.signin {
    padding-bottom: 16px;

    input {
      line-height: 20px;
      background-color: #333;
      color: white;
      border-radius: 4px;

      @media ${devices.medium} {
        padding: 24px 16px 4px 16px;
      }
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

      @media ${devices.medium} {
        line-height: 12px;
        font-size: 15px;
        left: 16px;
      }
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

  &.signup,
  &.landing {
    padding-bottom: 16px;

    input {
      border: 1px solid #8c8c8c;

      &:focus {
        border-color: #0071eb;
      }
    }

    input.error {
      border-color: #b92d2b;
    }

    input.success {
      border-color: #5fa53f;
    }

    div.error {
      margin-top: 0.4rem;
      font-size: 0.8rem;
      color: #b92d2b;
      text-align: left;
      width: 100%;
    }

    button.show-password {
      position: absolute;
      border: none;
      font-size: 14px;
      background: transparent;
      color: rgb(140, 140, 140);
      top: 22px;
      right: 10px;
      display: none;
    }

    &:focus-within button.show-password {
      display: block;
    }
  }

  &.landing {
    input.error {
      border: none;
      border-bottom: 2px solid #e87c03;
    }
    div.error {
      margin-top: 0.4rem;
      font-size: 1rem;
      color: #e87c03;
      text-align: left;
      width: 100%;

      @media ${devices.medium} {
        font-size: 0.8rem;
      }
    }
  }
`;

export type TextFieldMode = "signin" | "signup" | "landing";
export type TextFieldType = "account" | "password";

export interface TextFieldProps {
  label: string;
  mode: TextFieldMode;
  type: TextFieldType;
  value: string;
  errMsg: string;
  handleInput: (event: React.FormEvent<HTMLInputElement>) => void;
}

const TextField = ({
  label,
  mode,
  type,
  value,
  errMsg,
  handleInput,
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
    const buttonText = event.currentTarget.textContent;
    if (buttonText === "SHOW") event.currentTarget.textContent = "HIDE";
    else event.currentTarget.textContent = "SHOW";
  };

  return (
    <InputContainer className={`${mode}${" "}${type}`}>
      <input
        className={errMsg ? "error" : value && "success"}
        type={type === "password" && !showPassword ? "password" : "text"}
        value={value}
        onChange={handleInput}
      ></input>
      {type === "password" ? (
        <button className="show-password" onClick={handleShowPassword}>
          SHOW
        </button>
      ) : null}
      <label className={value && "filled"}>{label}</label>
      <div className="error">{errMsg}</div>
    </InputContainer>
  );
};

export default TextField;
