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
  padding: 4rem;
  margin: 0 auto;
  overflow: scroll;
`;

//functions outside of Component
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Div>
        <SideBar />
        <Main>
          <section>
            <Outlet />
          </section>
        </Main>
      </Div>
    </StyledAppLayout>
  );
}

export default AppLayout;
