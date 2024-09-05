/* eslint-disable react/prop-types */
import {Outlet} from "react-router-dom";
import Header from "../UI/Header";
import SideBar from "../UI/SideBar";
import styled from "styled-components";
import {useSelector} from "react-redux";

const StyledAppLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr;
  grid-template-columns: ${(props) => (props.showSideBar ? "1fr 35rem" : "1fr 4.5rem")};
  grid-auto-columns: auto;
  overflow: hidden;
  transition: var(--transition-1);
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
  margin: 0 auto;
  overflow: scroll;
  width: 100%;
  height: 100%;
  position: relative;
`;

//functions outside of Component
function AppLayout() {
  const showSideBar = useSelector((state) => state.ui.showSideBar);

  return (
    <StyledAppLayout showSideBar={showSideBar}>
      <Header />
      <Main>
        <section>
          <Outlet />
        </section>
      </Main>
      <SideBar />
    </StyledAppLayout>
  );
}

export default AppLayout;
