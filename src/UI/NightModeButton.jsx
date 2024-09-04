import {useState} from "react";
import styled from "styled-components";

const Container = styled.div`
  color: var(--color-grey-400);
  font-size: 2rem;
  margin-right: 1rem;
`;

const Button = styled.button`
  color: var(--color-grey-50);
  padding: 0.5rem;
  background-color: var(--color-blue-1);
  border: none;
  border-radius: 10px;
  transition: all, 0.2s;
  width: 3.5rem;
  height: 3.5rem;

  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
`;

function NightModeButton() {
  const [isNightMode, setIsNightMode] = useState(false);
  return (
    <Container>
      <Button onClick={() => setIsNightMode(!isNightMode)}>
        <ion-icon name={`${isNightMode ? "sunny" : "moon"}-outline`} />
      </Button>
    </Container>
  );
}

export default NightModeButton;
