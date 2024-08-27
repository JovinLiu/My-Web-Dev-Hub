import styled from "styled-components";

const Container = styled.div`
  color: var(--color-grey-400);
  font-size: 2rem;
  margin-right: 1rem;
`;

const Button = styled.button`
  color: var(--color-grey-800);
  padding: 0.5rem;
  background-color: var(--color-blue-1);
  border: none;
  border-radius: 10px;
  transition: all, 0.2s;
  width: 3.5rem;
  height: 3.5rem;

  &:hover {
    color: var(--color-grey-200);
    background-color: var(--color-blue-2);
  }
`;

function NightModeButton() {
  return (
    <Container>
      <Button>
        {/* <ion-icon name="sunny-outline"></ion-icon> */}
        <ion-icon name="moon-outline"></ion-icon>
      </Button>
    </Container>
  );
}

export default NightModeButton;
