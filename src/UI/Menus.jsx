/* eslint-disable react/prop-types */
import {cloneElement, createContext, useContext, useState} from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  width: 58rem;
  margin-left: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ListContainer = styled.div`
  width: 55rem;
  overflow: hidden;
`;

const MenusContext = createContext();

//Parent Compound Component
function Menus({children}) {
  const [position, setPosition] = useState(0);
  const scrollToLeft = () => setPosition(position + 15);
  const scrollToRight = () => setPosition(position - 15);

  return (
    <MenusContext.Provider value={{position, scrollToLeft, scrollToRight}}>
      <MenuContainer>{children}</MenuContainer>
    </MenusContext.Provider>
  );
}

//Action Button
function Action({children, actionCode}) {
  const {position, scrollToLeft, scrollToRight} = useContext(MenusContext);

  if (actionCode === "left" && position <= -10) return cloneElement(children, {onClick: scrollToLeft});
  if (actionCode === "right" && position >= -130) return cloneElement(children, {onClick: scrollToRight});
}

//Menu Window
function Window({children}) {
  const {position} = useContext(MenusContext);

  return <ListContainer>{cloneElement(children, {position})}</ListContainer>;
}

Menus.Action = Action;
Menus.Window = Window;

export default Menus;
