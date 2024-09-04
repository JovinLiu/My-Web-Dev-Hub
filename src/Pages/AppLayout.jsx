import {Outlet} from "react-router-dom";
import Header from "../UI/Header";
import SideBar from "../UI/SideBar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  max-width: 180rem;
  height: 100%;
  margin: auto;
  display: flex;
  overflow: scroll;
`;

const Main = styled.main`
  background-color: var(--color-grey-400);
  margin: 0 auto;
  overflow: scroll;
  width: 100%;
`;

//functions outside of Component
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Div>
        <Main>
          <section>
            <Outlet />
          </section>
        </Main>
        <SideBar />
      </Div>
    </StyledAppLayout>
  );
}

export default AppLayout;
