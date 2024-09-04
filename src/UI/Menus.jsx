/* eslint-disable react/prop-types */
import {cloneElement, createContext, useContext, useState} from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  width: 58rem;
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
function Menus({children, length}) {
  const [position, setPosition] = useState(0);
  const scrollToLeft = () => setPosition((prev) => Math.min(prev + 15, 0));
  const scrollToRight = () => setPosition((prev) => Math.max(prev - 15, -length));

  return (
    <MenusContext.Provider value={{position, scrollToLeft, scrollToRight}}>
      <MenuContainer>{children}</MenuContainer>
    </MenusContext.Provider>
  );
}

//Action Button
function Action({children, actionCode}) {
  const {scrollToLeft, scrollToRight} = useContext(MenusContext);

  if (actionCode === "left") return cloneElement(children, {onClick: scrollToLeft});
  if (actionCode === "right") return cloneElement(children, {onClick: scrollToRight});
}

//Menu Window
function Window({children}) {
  const {position} = useContext(MenusContext);

  return <ListContainer>{cloneElement(children, {position})}</ListContainer>;
}

Menus.Action = Action;
Menus.Window = Window;

export default Menus;
