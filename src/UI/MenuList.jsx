// import {useState} from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import Menus from "./Menus";

const MenuButton = styled.button`
  margin-top: 0.6rem;
  background: none;
  color: rgb(140, 140, 140);
  border: none;
  font-size: 30px;
  transition: all 0.3s;

  &:hover {
    color: var(--color-grey-50);
    transform: scale(1.2);
  }
`;

const List = styled.ul`
  white-space: nowrap;
  list-style: none;
  display: flex;
  font-size: 1.4rem;
  align-items: center;
  gap: 1.6rem;
  width: 65rem;
  overflow-x: visible;
  transition: all, 500ms;
  transform: translateX(${(props) => props.position}%);
`;

function MenuList() {
  //这个
  const categories = [
    "All Posts",
    "Web Basic",
    "JavaScript",
    "HTML",
    "CSS",
    "Sass",
    "Tailwind CSS",
    "React",
    "Redux",
    "NodeJS",
    "Express",
    "MangoDB",
    "Mongoose",
    "Bootstrap",
    "React Router",
    "React Query",
    "NextJS",
    "Git",
    "Github"
  ];

  const categoryLength = categories.join("").length;

  return (
    <Menus length={categoryLength}>
      <Menus.Action actionCode="left">
        <MenuButton>
          <ion-icon name="caret-back-outline" />
        </MenuButton>
      </Menus.Action>
      <Menus.Window>
        <List>
          {categories.map((category, i) => (
            <MenuItem category={category} key={i} />
          ))}
        </List>
      </Menus.Window>
      <Menus.Action actionCode="right">
        <MenuButton>
          <ion-icon name="caret-forward-outline" />
        </MenuButton>
      </Menus.Action>
    </Menus>
  );
}

export default MenuList;
