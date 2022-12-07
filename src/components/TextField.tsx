import styled from "styled-components";
import { useState } from "react";

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

  input.error {
    border-bottom: 2px orange solid;
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
    color: orange;
    text-align: left;
    width: 100%;
  }

  &:focus-within label {
    transform: translate(0, 12px) scale(0.8);
  }

  .filled {
    transform: translate(0, 12px) scale(0.8);
  }
`;

interface TextFieldProps {
  label: string;
  validator: (input: string) => void;
}

const TextField = ({ validator, label }: TextFieldProps) => {
  const [input, setInput] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    setInput(input);

    try {
      validator(input);
    } catch (error) {
      if (error instanceof Error) setErrMsg(error.message);
    }
  };

  return (
    <InputContainer>
      <input
        className={errMsg && "error"}
        type="text"
        value={input}
        onChange={handleInput}
      ></input>
      <label className={input && "filled"}>{label}</label>
      <div className="error">{errMsg}</div>
    </InputContainer>
  );
};

export default TextField;
