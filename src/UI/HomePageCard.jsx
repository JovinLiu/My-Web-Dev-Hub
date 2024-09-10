/* eslint-disable react/prop-types */
import styled from "styled-components";
import CardLine from "./CardLine";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30rem;
  height: 12rem;
  color: var(--color-grey-700);
  background-color: var(--color-grey-50);
  font-size: 3rem;
`;

const TextBox = styled.div`
  font-size: 1.5rem;
  padding: 0 2rem;
  color: var(--color-grey-300);
  overflow: hidden;
  height: 8.5rem;
`;

function HomePageCard({content}) {
  return (
    <Div>
      <CardLine height="0.7rem" />
      <TextBox>{content}</TextBox>
      <CardLine height="1.5rem" />
    </Div>
  );
}

export default HomePageCard;
