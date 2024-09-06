/* eslint-disable react/prop-types */
import styled from "styled-components";

const MainContainer = styled.main`
  background-color: var(--color-grey-100);
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-evenly;
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
