/* eslint-disable react/prop-types */
import styled from "styled-components";

const MainContainer = styled.main`
  background-color: var(--color-grey-100);
  margin: 0 auto;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  position: relative;
`;

function Main({children}) {
  return (
    <MainContainer>
      <section>{children}</section>
    </MainContainer>
  );
}

export default Main;
