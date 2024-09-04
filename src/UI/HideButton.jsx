/* eslint-disable react/prop-types */
import {useDispatch, useSelector} from "react-redux";
import {toggleShowSidebar} from "../Pages/uiSlice";
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  top: 40%;
  left: 0rem;
  transform: ${(props) => (props.showSideBar ? "translateX(0)" : "translateX(-100%)")};
  padding: 8rem 0.5rem;
  background-color: var(--color-blue-1);
  border: none;
  border-radius: ${(props) => (props.showSideBar ? "0 10px 10px 0" : "10px 0 0 10px")};
  color: var(--color-grey-800);
  &:hover {
    color: var(--color-grey-200);
    background-color: var(--color-blue-2);
  }
  transition: all 0.2s ease-in-out;
`;

function HideButton() {
  const showSidebar = useSelector((state) => state.ui.showSideBar);
  const dispatch = useDispatch();

  function handleClickHide() {
    dispatch(toggleShowSidebar());
  }

  return (
    <Button onClick={handleClickHide} showSideBar={showSidebar}>
      <ion-icon name={`chevron-${showSidebar ? "forward" : "back"}-outline`} />
    </Button>
  );
}

export default HideButton;
