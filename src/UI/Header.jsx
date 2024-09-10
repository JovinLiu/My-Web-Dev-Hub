/* eslint-disable react/prop-types */
import {Link} from "react-router-dom";
import styled from "styled-components";
import MenuList from "./MenuList";
import SearchBar from "./SearchBar";
import AddPostButton from "./Buttons/AddPostButton";
import Logo from "./Logo";
import NightModeButton from "./Buttons/DarkModeButton";
import SignInUpButton from "./Buttons/SignInUpButton";

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

function Header({homepage}) {
  return (
    <HeaderContainer>
      <StyledHeader>
        <nav>
          <Link to="/">
            <Logo />
          </Link>
        </nav>
        {homepage ? null : <MenuList />}
        <FeatureContainer>
          {homepage ? (
            <SignInUpButton />
          ) : (
            <>
              <SearchBar />
              <AddPostButton />
            </>
          )}
          <NightModeButton />
        </FeatureContainer>
      </StyledHeader>
    </HeaderContainer>
  );
}

export default Header;
