/* eslint-disable react/prop-types */
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";
//API
import {setIsLoggedIn, setCurrentUserId} from "../Pages/uiSlice";
//Components
import MenuList from "./MenuList";
import SearchBar from "./SearchBar";
import AddPostButton from "./Buttons/AddPostButton";
import Logo from "./Logo";
import NightModeButton from "./Buttons/DarkModeButton";
import SignInUpButton from "./Buttons/SignInUpButton";

const HeaderContainer = styled.nav`
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

function Header({page, showLogoOnly = false}) {
  const {isLoggedIn} = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("jwt");

    if (!token) {
      dispatch(setIsLoggedIn(false));
      return;
    }

    function parseJwt(token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16))?.slice(-2))
            .join("")
        );
        return JSON.parse(jsonPayload);
      } catch (e) {
        console.error("Invalid token:", e);
        return null;
      }
    }

    const decodedPayload = parseJwt(token);

    if (decodedPayload) {
      const expires = decodedPayload.exp * 1000;
      const currentTime = Date.now();

      const userId = decodedPayload.id;

      if (currentTime <= expires) {
        dispatch(setIsLoggedIn(true));
        dispatch(setCurrentUserId(userId));
      } else {
        dispatch(setIsLoggedIn(false));
      }
    } else {
      console.error("Failed to decode JWT.");
      dispatch(setIsLoggedIn(false));
    }
  }, [dispatch]);

  return (
    <HeaderContainer>
      <StyledHeader>
        <nav>
          <Link to="/">
            <Logo />
          </Link>
        </nav>
        {showLogoOnly ? null : (
          <>
            {page === "homepage" ? null : <MenuList />}
            <FeatureContainer>
              {page === "homepage" ? (
                isLoggedIn ? (
                  ""
                ) : (
                  <SignInUpButton />
                )
              ) : (
                <>
                  <SearchBar />
                  <AddPostButton />
                </>
              )}
              <NightModeButton />
            </FeatureContainer>
          </>
        )}
      </StyledHeader>
    </HeaderContainer>
  );
}

export default Header;
