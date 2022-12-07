import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Cross } from "../assets/x.svg";
import QandA from "./questions";

const FAQList = styled.ul`
  margin: 2em auto;
  max-width: 800px;
  color: white;
  font-family: "Netflix Sans Light";
  padding: 0;

  li {
    list-style-type: none;
    margin: 0 0 8px;
  }

  button {
    border: 0;
    margin-bottom: 1px;
    padding: 0.8em 2.2em 0.8em 1.2em;
    position: relative;
    font-size: 1.7rem;
    font-family: "Netflix Sans Light";
    width: 100%;
    text-align: left;
    background: #303030;
    color: white;
    cursor: pointer;
  }

  div {
    background: #303030;
    text-align: left;
    font-size: 1.7rem;
    transition: max-height 0.25s cubic-bezier(0.5, 0, 0.1, 1);
    overflow: hidden;
  }

  div.open {
    max-height: 1200px;
  }

  div.close {
    max-height: 0px;
  }

  span {
    display: inline-block;
    padding: 1.2em;
  }
`;

const ListX = styled(Cross)`
  fill: white;
  position: absolute;
  right: 1em;
  top: 35%;

  &.close {
    transform: scale(1.7) rotate(-45deg);
  }

  &.open {
    transform: scale(1.7);
  }
`;

const QuestionTab = ({
  question,
  answer,
}: {
  question: string;
  answer: JSX.Element;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <li>
      <button onClick={() => setOpen(!open)}>
        {question}
        <ListX className={open ? "open" : "close"} />
      </button>
      <div className={open ? "open" : "close"}>
        <span>{answer}</span>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <FAQList>
      {QandA.map((pair, index) => (
        <QuestionTab
          key={index}
          question={pair.question}
          answer={pair.answer}
        />
      ))}
    </FAQList>
  );
};

export default FAQ;
