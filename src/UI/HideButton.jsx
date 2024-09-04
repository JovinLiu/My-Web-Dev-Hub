/* eslint-disable react/prop-types */
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  top: 40%;
  left: 0;
  transform: ${({hide}) => (hide ? "translateX(-100%)" : "translateX(0%)")};
  padding: 4rem 0.2rem;
  background-color: var(--color-blue-1);
  border: none;
  border-radius: ${({hide}) => (hide ? "10px 0 0 10px" : "0 10px 10px 0")};
  color: var(--color-grey-800);
  &:hover {
    color: var(--color-grey-200);
    background-color: var(--color-blue-2);
  }
`;

function HideButton({onClick, hide}) {
  return (
    <Button onClick={onClick} hide={hide}>
      {hide ? <ion-icon name="caret-back-outline" /> : <ion-icon name={`chevron-${hide ? "back" : "forward"}-outline`} />}
    </Button>
  );
}

export default HideButton;
