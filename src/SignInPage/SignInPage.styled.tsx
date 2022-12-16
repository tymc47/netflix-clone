import styled from "styled-components";

export const SignInPageContainer = styled.div`
  height: 100%;
`;
export const SignInContainer = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 60px 68px 40px;
  font-family: "Netflix Sans Light";
  color: white;
  max-width: 450px;
  min-height: 660px;
  margin: 0 auto 0;
  z-index: 10;
`;

export const SignInForm = styled.div`
  flex: 1;

  input {
    line-height: 25px;
  }

  button {
    border-radius: 4px;
    font-size: 16px;
    margin: 24px 0 12px;
    padding: 16px;
    height: auto;
  }

  div.login-help {
    display: flex;
    font-size: 13px;
    color: #b3b3b3;
  }

  div.error-message {
    padding: 10px 20px;
    color: white;
    background-color: #e87c03;
    font-size: 14px;
    margin: 0 0 16px;
    border-radius: 4px;
  }
`;

export const RememberMe = styled.div`
  position: relative;
  flex: 1 0 auto;
  padding-left: 20px;

  input {
    position: absolute;
    opacity: 0;
    left: 1px;
  }

  input[type="checkbox"]:checked + label:after {
    content: "\u2713";
    font-weight: 900;
    color: #000;
    position: absolute;
    left: 3px;
  }

  label:before {
    content: "";
    position: absolute;
    background: #737373;
    border: 0;
    border-radius: 2px;
    width: 16px;
    height: 16px;
    left: 1px;
    top: -1px;
  }
`;

export const FormOther = styled.div`
  color: #b3b3b3;
  font-size: 16px;

  a {
    text-decoration: none;
    color: white;
  }

  div.disclaimer {
    font-size: 13px;

    button {
      background-color: transparent;
      border: none;
      color: #0071eb;
      cursor: pointer;
      padding: 0;

      &.hide {
        visibility: hidden;
      }
    }

    button:hover {
      text-decoration: underline;
    }
  }

  div.hide {
    opacity: 0;
  }

  div.disclaimer-text {
    opacity: 1;
    a {
      color: #0071eb;
    }
  }
`;
