/* eslint-disable react/prop-types */
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {toggleShowEditor} from "../../Pages/uiSlice";
import {toggleShowSideBar} from "../../Pages/uiSlice";

const Button = styled.button`
  position: absolute;
  top: 45%;
  left: ${({position}) => position === "right" && 0};
  right: ${({position}) => position === "left" && 0};
  transform: ${({position, transformLeft, transformRight}) => (position === "left" ? transformLeft : transformRight)};
  padding: 5rem 0.2rem;
  background-color: var(--color-blue-1);
  border: none;
  border-radius: ${({position, borderRadiusLeft, borderRadiusRight}) => (position === "left" ? borderRadiusLeft : borderRadiusRight)};
  color: var(--color-grey-50);
  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
  transition: var(--transition-1);
  z-index: 10;
`;

function HideButton({position}) {
  const {showEditor, showSideBar} = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  function handleClickHideLeft() {
    dispatch(toggleShowEditor());
  }

  function handleClickHideRight() {
    dispatch(toggleShowSideBar());
  }

  const handleClick = position === "left" ? handleClickHideLeft : handleClickHideRight;
  const iconLeft = showEditor ? "back" : "forward";
  const iconRight = showSideBar ? "forward" : "back";
  const borderRadiusLeft = showEditor ? "5px 0 0 5px" : "0 5px 5px 0";
  const borderRadiusRight = showSideBar ? "0 5px 5px 0" : "5px 0 0 5px";
  const transformLeft = showEditor ? "translateX(0)" : `translateX(100%)`;
  const transformRight = showSideBar ? "translateX(0)" : `translateX(-100%)`;

  return (
    <Button
      onClick={handleClick}
      position={position}
      showEditor={showEditor}
      showSideBar={showSideBar}
      borderRadiusLeft={borderRadiusLeft}
      borderRadiusRight={borderRadiusRight}
      transformLeft={transformLeft}
      transformRight={transformRight}
    >
      <ion-icon name={`chevron-${position === "left" ? iconLeft : iconRight}-outline`} />
    </Button>
  );
}

export default HideButton;
