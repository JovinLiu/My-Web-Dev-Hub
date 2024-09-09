/* eslint-disable react/prop-types */
import styled from "styled-components";
import HideButton from "./Buttons/HideButtonRight";
import {useGetPostsByCategoryQuery} from "../Utils/data";
import Loader from "./Loader";
import NavListItem from "./NavListItem";
import {useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import GeneralButton from "./Buttons/GeneralButton";

const Container = styled.aside`
  height: calc(100vh - 6rem);
  width: 35rem;
  color: var(--color-grey-500);
  position: relative;
  background-color: var(--color-grey-50);
  transition: var(--transition-1);
`;

const Div = styled.div`
  margin: 2rem 2.5rem 2rem 2.5rem;
  display: block;
  overflow: hidden;
`;

const ListContainer = styled.div`
  height: calc(100vh - 6rem - 12rem);
  display: ${(props) => (props.showSideBar ? "block" : "none")};
  overflow: scroll;
`;

const Nav = styled.nav`
  display: flex;
  margin: ${({showSideBar}) => (showSideBar ? "0rem 2.5rem 0rem 2.5rem" : "0rem 2.5rem 0rem 0.5rem")};
  height: 8rem;
  align-items: center;
`;

const NavButton = styled.div`
  display: ${({showSideBar}) => (showSideBar ? "flex" : "none")};
  align-items: center;
  gap: 1.5rem;
`;

const Greeting = styled.span`
  margin-left: 2rem;
  margin-right: 2rem;
  font-size: 1.5rem;
  font-weight: bolder;
  width: 12rem;
  overflow: hidden;
  display: ${(props) => (props.showSideBar ? "block" : "none")};
`;

const Avatar = styled.img`
  display: block;
  width: 3.5rem;
  height: 3.5rem;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-200);
`;

const Hr = styled.hr`
  border-top: 0.1px solid var(--color-grey-500);
  margin: auto;
  overflow: visible;
  text-align: center;
  width: 30rem;
  height: 1px;
  display: ${(props) => (props.showSideBar ? "block" : "none")};
`;

function SideBar() {
  const {currentTag, showSideBar, currentPage, cardsPerPage} = useSelector((state) => state.ui);
  const query = currentTag === "AllPosts" ? "" : currentTag;
  const arg = {category: query, start: (currentPage - 1) * cardsPerPage, limit: cardsPerPage};
  const {currentData: posts = [], isLoading} = useGetPostsByCategoryQuery(arg);
  const src = "/default-user.jpg";
  const time = useRef(null);

  useEffect(function () {
    const currentHour = new Intl.DateTimeFormat(navigator.language, {
      hour: "numeric",
      hour12: false
    }).format(new Date());

    if (currentHour >= 6 && currentHour <= 11) time.current = "Morning";
    if (currentHour >= 12 && currentHour <= 18) time.current = "Afternoon";
    if ((currentHour >= 19 && currentHour <= 23) || (currentHour >= 0 && currentHour < 6)) time.current = "Evening";
  }, []);

  if (isLoading)
    return (
      <Container showSideBar={showSideBar}>
        <HideButton />
        <Loader />
      </Container>
    );

  return (
    <Container showSideBar={showSideBar}>
      <HideButton />
      <Nav showSideBar={showSideBar}>
        <Avatar src={src} alt="user-avatar" />
        {showSideBar && (
          <NavButton showSideBar={showSideBar}>
            <Greeting showSideBar={showSideBar}>
              Good {time.current}
              <br />
              Jovin
            </Greeting>
            <GeneralButton type="userRound">
              <ion-icon name="person-outline" />
            </GeneralButton>
            <GeneralButton type="userRound">
              <ion-icon name="log-out-outline" />
            </GeneralButton>
          </NavButton>
        )}
      </Nav>
      {showSideBar && (
        <>
          <Hr showSideBar={showSideBar} />
          <Div>
            <ListContainer showSideBar={showSideBar}>
              {posts.map((post, i) => (
                <NavListItem title={post.title} key={i} />
              ))}
            </ListContainer>
          </Div>
        </>
      )}
    </Container>
  );
}

export default SideBar;
