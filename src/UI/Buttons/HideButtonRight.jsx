/* eslint-disable react/prop-types */
import {useDispatch, useSelector} from "react-redux";
import {toggleShowSideBar} from "../../Pages/uiSlice";
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  top: 45%;
  left: 0rem;
  transform: ${(props) => (props.showSideBar ? "translateX(0)" : "translateX(-100%)")};
  padding: 5rem 0.2rem;
  background-color: var(--color-blue-1);
  border: none;
  border-radius: ${(props) => (props.showSideBar ? "0 5px 5px 0" : "5px 0 0 5px")};
  color: var(--color-grey-50);
  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
  transition: var(--transition-1);
`;

function HideButton() {
  const showSideBar = useSelector((state) => state.ui.showSideBar);
  const dispatch = useDispatch();

  function handleClickHide() {
    dispatch(toggleShowSideBar());
  }

  return (
    <Button onClick={handleClickHide} showSideBar={showSideBar}>
      <ion-icon name={`chevron-${showSideBar ? "forward" : "back"}-outline`} />
    </Button>
  );
}

export default HideButton;
