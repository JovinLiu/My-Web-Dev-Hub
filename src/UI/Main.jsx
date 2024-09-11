/* eslint-disable react/prop-types */
import styled from "styled-components";

const MainContainer = styled.main`
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  padding: 0 4rem 0rem 4rem;
  height: 100%;
  position: relative;
  background-color: var(--color-grey-100);
  border-left: 1px solid var(--color-grey-500);
  border-right: 1px solid var(--color-grey-500);
`;

function Main({children}) {
  return (
    <MainContainer>
      <section>{children}</section>
    </MainContainer>
  );
}

export default Main;
