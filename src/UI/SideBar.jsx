import styled from "styled-components";

const StyledSideBar = styled.aside`
  background-color: var(--color-grey-600);
  width: 25rem;
`;

function SideBar() {
  return <StyledSideBar>{/* <MainNav /> */}</StyledSideBar>;
}

export default SideBar;
