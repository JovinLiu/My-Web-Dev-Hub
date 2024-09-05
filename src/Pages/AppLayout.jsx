/* eslint-disable react/prop-types */
import {Outlet} from "react-router-dom";
import Header from "../UI/Header";
import SideBar from "../UI/SideBar";
import styled from "styled-components";
import {useSelector} from "react-redux";
import Main from "../UI/Main";
import PostEditor from "../Features/PostEditor/PostEditor";

const StyledAppLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr;
  grid-template-columns: ${({showEditor, showSideBar}) => {
    if (showEditor && showSideBar) return "50vw 1fr 35rem";
    if (showEditor && !showSideBar) return "50vw 1fr 4.5rem";
    if (!showEditor && showSideBar) return "4.5rem 1fr 35rem";
    if (!showEditor && !showSideBar) return "4.5rem 1fr 4.5rem";
  }};
  grid-auto-columns: auto;
  overflow: hidden;
  transition: var(--transition-1);
`;

//functions outside of Component
function AppLayout() {
  const showSideBar = useSelector((state) => state.ui.showSideBar);
  const showEditor = useSelector((state) => state.ui.showEditor);

  return (
    <StyledAppLayout showEditor={showEditor} showSideBar={showSideBar}>
      <Header />
      <PostEditor />
      <Main>
        <Outlet />
      </Main>
      <SideBar />
    </StyledAppLayout>
  );
}

export default AppLayout;
