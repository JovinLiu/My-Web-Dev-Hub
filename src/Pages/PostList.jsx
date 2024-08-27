// import {useRef} from "react";
// import usePosts from "../Features/PostList/usePosts";
import styled from "styled-components";
// import PostItem from "../Features/PostList/PostItem";

const Container = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 4.2rem;
  margin-bottom: 8rem;
  color: white;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
`;

function PostList() {
  // const {isLoading, error, posts} = usePosts();

  // const lastEnd1 = useRef(0);
  // const lastEnd2 = useRef(0);
  // const lastEnd3 = useRef(0);

  // if (isLoading) return <div>Loading data...</div>;
  // if (error) return <div>There is an error</div>;

  return (
    <section>
      <Container>
        Hello
        {/* {posts.map((post, i) => (
          <PostItem post={post} index={i} key={post.id} lastEnd1={lastEnd1} lastEnd2={lastEnd2} lastEnd3={lastEnd3} />
        ))} */}
      </Container>
    </section>
  );
}

export default PostList;
