import styled from "styled-components";
import HideButton from "./HideButton";
import {useState} from "react";
import {useGetAllPostsQuery} from "../Utils/data";
import Loader from "./Loader";
import NavListItem from "./NavListItem";

const Container = styled.aside`
  color: var(--color-grey-100);
  position: relative;
  background-color: var(--color-grey-500);
  transition: all 0.2s ease-in-out;
  width: 35rem;
  transform: ${({hide}) => (hide ? "translateX(100%)" : "translateX(0)")};
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
  height: 80vh;
  display: ${({hide}) => (hide ? "none" : "contents")};
  display: block;
  overflow: scroll;
`;

function SideBar() {
  const [hide, setHide] = useState(false);
  const {currentData: posts = [], isLoading} = useGetAllPostsQuery();

  function handleClickHide() {
    setHide(!hide);
  }

  if (isLoading)
    return (
      <Container hide={hide}>
        <HideButton onClick={handleClickHide} hide={hide} />
        <Loader />
      </Container>
    );

  return (
    <Container hide={hide}>
      <HideButton onClick={handleClickHide} hide={hide} />
      <Div>
        {!hide && (
          <>
            <H2>Navigation</H2>
            <ListContainer>
              {posts.map((post, i) => (
                <NavListItem title={post.title} key={i} />
              ))}
            </ListContainer>
          </>
        )}
      </Div>
    </Container>
  );
}

export default SideBar;
