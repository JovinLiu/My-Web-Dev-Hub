/* eslint-disable react/prop-types */
import styled from "styled-components";
import HideButton from "./Buttons/HideButton";
import {useGetTopicStatsQuery} from "../Services/PostsApi";
import Loader from "./Loader";
import TopicListItem from "./TopicListItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import GeneralButton from "./Buttons/GeneralButton";
import SignInUpButton from "./Buttons/SignInUpButton";
import {useSearchParams} from "react-router-dom";
import Cookies from "js-cookie";
import {setCurrentUser, setLogOut} from "../Pages/uiSlice";
import {useGetUserByIdQuery} from "../Services/UsersApi";
import Modal from "./Modal";
import Setting from "./Setting";
import {host} from "../Utils/config";

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
  position: relative;
`;

const ListContainer = styled.div`
  list-style: none;
  height: calc(100vh - 6rem - 12rem);
  display: ${(props) => (props.showSideBar ? "block" : "none")};
  overflow-y: scroll;
`;

const Transparent = styled.div`
  pointer-events: none;
  position: sticky;
  bottom: 0;
  width: 100%;
  height: calc(60vh - 20rem);
  background: linear-gradient(180deg, transparent 0, var(--color-grey-50) 80%);
  transition: all 0.3s ease;
  &:hover {
    background: none;
  }
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
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const {showSideBar, isLoggedIn, currentUser, currentUserId} = useSelector((state) => state.ui);
  const {currentData, isLoading, isFetching, refetch} = useGetTopicStatsQuery(category);
  const {currentData: currentUserData = {}} = useGetUserByIdQuery(currentUserId);
  let user;
  if (currentUserData.user) user = currentUserData.user;

  const src = isLoggedIn && currentUser ? `${host}/images/user/${currentUser.photo}` : "/default-user.jpg";
  const time = useRef(null);
  const topics = currentData?.data?.stats;

  function handleClickLogout() {
    Cookies.remove("jwt");
    dispatch(setLogOut());
  }

  useEffect(() => {
    refetch();
  }, [currentUserId, refetch]);

  useEffect(() => {
    if (user) dispatch(setCurrentUser(user));
  }, [isLoggedIn, user, dispatch, currentUserId]);

  useEffect(function () {
    const currentHour = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false
    }).format(new Date());

    if (currentHour >= 6 && currentHour <= 11) time.current = "Morning";
    if (currentHour >= 12 && currentHour <= 18) time.current = "Afternoon";
    if ((currentHour >= 19 && currentHour <= 23) || (currentHour >= 0 && currentHour < 6)) time.current = "Evening";
  }, []);

  if (isLoading || isFetching)
    return (
      <Container showSideBar={showSideBar}>
        <HideButton position="right" />
        <Loader />
      </Container>
    );

  return (
    <Container showSideBar={showSideBar}>
      <HideButton position="right" />
      <Nav showSideBar={showSideBar}>
        <Avatar src={src} alt="user-avatar" />
        {showSideBar && (
          <NavButton showSideBar={showSideBar}>
            <Greeting showSideBar={showSideBar}>
              Good {time.current}
              <br />
              {isLoggedIn && currentUser.name ? `${currentUser?.name}` : ""}
            </Greeting>
            {isLoggedIn ? (
              <>
                <Modal>
                  <Modal.Open openCode="setting">
                    <GeneralButton type="userRound">
                      <ion-icon name="person-outline" />
                    </GeneralButton>
                  </Modal.Open>
                  <Modal.Window verifyCode="setting">
                    <Setting />
                  </Modal.Window>
                </Modal>
                <GeneralButton type="userRound" onClick={handleClickLogout}>
                  <ion-icon name="log-out-outline" />
                </GeneralButton>
              </>
            ) : (
              <SignInUpButton />
            )}
          </NavButton>
        )}
      </Nav>
      {showSideBar && (
        <>
          <Hr showSideBar={showSideBar} />
          <Div>
            <ListContainer showSideBar={showSideBar}>
              {topics?.map((topic, i) => (
                <TopicListItem topic={topic._id} titles={topic.titles} key={i} />
              ))}
              <Transparent />
            </ListContainer>
          </Div>
        </>
      )}
    </Container>
  );
}

export default SideBar;
