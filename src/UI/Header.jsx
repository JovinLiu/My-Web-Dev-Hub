import {Link} from "react-router-dom";
import styled from "styled-components";
import MenuList from "./MenuList";
import SearchBar from "./SearchBar";
import AddPostButton from "./AddPostButton";
import Logo from "./Logo";
import NightModeButton from "./NightModeButton";

const HeaderContainer = styled.div`
  background-color: var(--color-grey-50);
  grid-column: 1 / -1;
  border-bottom: 1px solid var(--color-grey-500);
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
  max-width: 180rem;
  margin: auto;
`;

const FeatureContainer = styled.div`
  display: flex;
  gap: 2rem;
  height: 3.5rem;
  margin-right: 3rem;
`;

function Header() {
  return (
    <HeaderContainer>
      <StyledHeader>
        <nav>
          <Link to="/">
            <Logo />
          </Link>
        </nav>
        <MenuList />
        <FeatureContainer>
          <SearchBar />
          <AddPostButton />
          <NightModeButton />
        </FeatureContainer>
      </StyledHeader>
    </HeaderContainer>
  );
}

export default Header;
