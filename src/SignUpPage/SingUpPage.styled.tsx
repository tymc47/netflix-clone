import styled from "styled-components";
import devices from "../utils/devices";

export const SignUpPageContainer = styled.div`
  background-color: white;
  color: #333;
`;

export const SignUpFormContainer = styled.div`
  border-top: 1px solid #e6e6e6;
  margin-top: 20px;
`;

export const SignUpForm = styled.div`
  position: relative;
  background-color: transparent;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 30px 50px 40px;
  font-family: "Netflix Sans Light";
  color: #333;
  max-width: 500px;
  min-height: 660px;
  margin: 0 auto;
  z-index: 10;

  @media ${devices.medium} {
    padding: 15px 25px 20px;
  }

  div.error-message {
    padding: 20px 10px;
    background-color: rgb(251, 164, 4);
    display: flex;
    align-items: center;
    column-gap: 1rem;

    @media ${devices.medium} {
      padding: 10px 5px;
      svg {
        font-size: 1rem;
      }
    }

    h4 {
      margin: 0;
    }
    svg {
      font-size: 1.5rem;
    }
  }

  h1 {
    font-family: "Netflix Sans";
    font-weight: 400;
  }

  h3 {
    margin: 0 0 16px;
  }
`;

export const FormField = styled.div`
  flex: 1;

  input {
    border: 1px solid #8c8c8c;
  }

  button {
    border: none;
    border-radius: 4px;
  }
`;
