import styled from "styled-components";
import {useGetAllPostsQuery} from "../Utils/data";
import PostCard from "../Features/PostList/PostCard";
import Loader from "../UI/Loader";
import {useEffect, useRef} from "react";

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

  const allCards = useRef(null);

  useEffect(
    function () {
      if (!allCards?.current?.childNodes) return;

      const revealCard = (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("style", "opacity: 100%");
          observer.unobserve(entry.target);
        });
      };

      const options = {root: null, thresholds: 2, rootMargin: "-100px"};

      const cardObserver = new IntersectionObserver(revealCard, options);

      if (!allCards?.current?.childNodes) return;
      Array.from(allCards?.current?.childNodes).forEach((card) => {
        card.setAttribute("style", "opacity: 0%");
      });

      allCards.current.childNodes.forEach((card) => {
        cardObserver.observe(card);
      });
    },
    [posts]
  );

  if (isLoading) return <Loader />;

  if (posts.length === 0) return <Container>No Post found</Container>;

  return (
    <Container ref={allCards}>
      {posts.map((post, i) => (
        <PostCard post={post} fadeInTime={i} key={post.id} />
      ))}
    </Container>
  );
}

export default PostList;
