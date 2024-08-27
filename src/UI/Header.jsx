import {Link} from "react-router-dom";
import styled from "styled-components";
import MenuList from "./MenuList";
import SearchBar from "./SearchBar";
import AddPostButton from "./AddPostButton";
import Logo from "./Logo";
import NightModeButton from "./NightModeButton";

const StyledHeader = styled.header`
  background-color: var(--color-grey-800);
  grid-column: 1/-1;
  height: 6rem;
  display: flex;
  align-items: center;
  gap: 5rem;
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  gap: 2rem;
  height: 3.5rem;
  margin-left: auto;
  margin-right: 3rem;
`;

function Header() {
  return (
    <StyledHeader>
      <nav>
        <Link to="/">
          <Logo />
        </Link>
      </nav>
      <MenuList />
      <SearchBar />
      <ButtonContainer>
        <AddPostButton />
        <NightModeButton />
      </ButtonContainer>
    </StyledHeader>
  );
}

export default Header;
