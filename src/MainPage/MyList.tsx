import styled from "styled-components";
import { useStateValue } from "../state";
import SliderCard from "./SliderCard";

const MyListContainer = styled.div`
  min-height: 100vh;
  padding: 5vh 4vw;
`;

const MyListCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
  column-gap: 1rem;
`;

const MyList = () => {
  const [{ mylist }] = useStateValue();

  return (
    <MyListContainer>
      <MyListCardsContainer>
        {mylist.map((show) => (
          <SliderCard
            key={show.id}
            show={show}
            itemWidth={window.innerWidth * 0.14}
            toggleArrow={() => {
              null;
            }}
          />
        ))}
      </MyListCardsContainer>
    </MyListContainer>
  );
};

export default MyList;
