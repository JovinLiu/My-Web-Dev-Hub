/* eslint-disable react/prop-types */
import styled from "styled-components";
import HideButton from "./Buttons/HideButton";
// import {useState} from "react";
import {useGetAllPostsQuery} from "../Utils/data";
import Loader from "./Loader";
import NavListItem from "./NavListItem";
import {useSelector} from "react-redux";

const Container = styled.aside`
  color: var(--color-grey-500);
  position: relative;
  background-color: var(--color-grey-50);
  width: 35rem;
  border-left: 1px solid var(--color-grey-500);
`;

const Div = styled.div`
  margin: 4rem 2rem 2rem 4rem;
  height: 90vh;
  display: block;
  overflow: hidden;
`;

const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 4rem;
`;

const ListContainer = styled.div`
  /* background-image: -webkit-linear-gradient(bottom, var(--color-grey-50), var(--color-grey-600));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
  height: 80vh;
  display: ${(props) => (props.showSidebar ? "contents" : "none")};
  display: block;
  overflow: scroll;
`;

function SideBar() {
  const {currentData: posts = [], isLoading} = useGetAllPostsQuery();
  const showSidebar = useSelector((state) => state.ui.showSideBar);

  if (isLoading)
    return (
      <Container showSidebar={showSidebar}>
        <HideButton />
        <Loader />
      </Container>
    );

  return (
    <Container showSidebar={showSidebar}>
      <HideButton />
      <Div>
        <H2>Navigation</H2>
        <ListContainer showSidebar={showSidebar}>
          {posts.map((post, i) => (
            <NavListItem title={post.title} key={i} />
          ))}
        </ListContainer>
      </Div>
    </Container>
  );
}

export default SideBar;
