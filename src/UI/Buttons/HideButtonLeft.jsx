/* eslint-disable react/prop-types */
import {useDispatch, useSelector} from "react-redux";
import {toggleShowEditor} from "../../Pages/uiSlice";
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  top: 45%;
  right: 0%;
  transform: ${(props) => (props.showEditor ? "translateX(0)" : "translateX(100%)")};
  padding: 5rem 0.2rem;
  background-color: var(--color-blue-1);
  border: none;
  border-radius: ${(props) => (props.showEditor ? "5px 0 0 5px" : "0 5px 5px 0")};
  color: var(--color-grey-50);
  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
  transition: var(--transition-1);
  z-index: 10;
`;

function HideButton() {
  const showEditor = useSelector((state) => state.ui.showEditor);
  const dispatch = useDispatch();

  console.log(showEditor);

  function handleClickHide() {
    dispatch(toggleShowEditor());
  }

  return (
    <Button onClick={handleClickHide} showEditor={showEditor}>
      <ion-icon name={`chevron-${showEditor ? "back" : "forward"}-outline`} />
    </Button>
  );
}

export default HideButton;
