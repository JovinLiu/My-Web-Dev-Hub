import styled from "styled-components";
import MenuItem from "./MenuItem";
import Menus from "./Menus";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage, setCurrentTag} from "../Pages/uiSlice";
import {useNavigate} from "react-router-dom";

const MenuButton = styled.button`
  margin-top: 0.6rem;
  background: none;
  color: var(--color-blue-1);
  border: none;
  font-size: 30px;
  transition: all 0.3s;

  &:hover {
    color: var(--color-blue-2);
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
  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.ui);
  const navigate = useNavigate();

  const categoryLength = categories.join("").length + 40;

  function handleClickTag(e) {
    const category = e.target.value;
    dispatch(setCurrentTag(category));
    dispatch(setCurrentPage(1));
    if (category === "AllPosts") return navigate("/app/posts");
    //这个地方吧navigate('/app/posts)改成navigate("/app")来解决一个tag出现多种tag的内容的问题。解决办法不好
    navigate(`/app/posts?category=${category}`);
    // navigate(`/app/posts?category=${category}&_start=${start}&_limit=${limit}&search=${searchQuery}`);
  }

  return (
    <Menus length={categoryLength}>
      <Menus.Action actionCode="left">
        <MenuButton>
          <ion-icon name="caret-back-outline" />
        </MenuButton>
      </Menus.Action>
      <Menus.Window>
        <List onClick={handleClickTag}>
          <MenuItem category="All Posts" />
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
