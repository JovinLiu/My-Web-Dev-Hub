import {Outlet} from "react-router-dom";
import Header from "../UI/Header";
import SideBar from "../UI/SideBar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-400);
  padding: 4rem;
  margin: 0 auto;
  overflow: scroll;
  width: 100%;
`;

//functions outside of Component
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
