// import {useRef} from "react";
// import usePosts from "../Features/PostList/usePosts";
import styled from "styled-components";
import {useGetAllPostsQuery} from "../Utils/data";
import PostCard from "../Features/PostList/PostCard";
import Loader from "../UI/Loader";
// import PostItem from "../Features/PostList/PostItem";

const Container = styled.div`
  margin-top: 3rem;
  color: white;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
`;

function PostList() {
  const {currentData: posts, isLoading} = useGetAllPostsQuery();

  // const {isLoading, error, posts} = usePosts();

  // const lastEnd1 = useRef(0);
  // const lastEnd2 = useRef(0);
  // const lastEnd3 = useRef(0);

  if (isLoading) return <Loader />;
  // if (error) return <div>There is an error</div>;

  return (
    <section>
      <Container>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </Container>
    </section>
  );
}

export default PostList;
