import styled from "styled-components";
import {useGetAllPostsQuery} from "../Utils/data";
import PostCard from "../Features/PostList/PostCard";
import Loader from "../UI/Loader";
// import {useEffect} from "react";

const Container = styled.div`
  margin: auto;
  padding: 4rem;
  color: white;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  max-width: 150rem;
`;

function PostList() {
  const {currentData: posts = [], isLoading} = useGetAllPostsQuery();

  // useEffect();

  if (isLoading) return <Loader />;

  if (posts.length === 0) return <Container>No Post found</Container>;

  return (
    <Container>
      {posts.map((post, i) => (
        <PostCard post={post} fadeInTime={i} key={post.id} />
      ))}
    </Container>
  );
}

export default PostList;
