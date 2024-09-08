import styled from "styled-components";
import {useGetPostsByCategoryQuery} from "../../Utils/data";
import PostCard from "./PostCard";
import Loader from "../../UI/Loader";
import {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {setPostsNum} from "../../Pages/uiSlice";
// import {useGetAllPostsQuery} from "../../Utils/data";
// import NoPostFound from "../../UI/NoPostFound";

const Container = styled.div`
  margin: auto;
  color: white;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  //看看要不要删除
  max-width: 160rem;
`;

function PostList() {
  const {currentTag} = useSelector((state) => state.ui);
  const searchQuery = {category: currentTag === "AllPosts" ? "" : currentTag};
  const {currentData: posts = [], isLoading} = useGetPostsByCategoryQuery(searchQuery);
  // const {currentData: posts = [], isLoading} = useGetAllPostsQuery();
  const dispatch = useDispatch();
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

  dispatch(setPostsNum(posts.length));

  // if (posts.length === 0)
  //   return (
  //     <Container>
  //       <NoPostFound />
  //     </Container>
  //   );

  return (
    <Container ref={allCards}>
      {posts.map((post, i) => (
        <PostCard post={post} fadeInTime={i} key={post.id} />
      ))}
    </Container>
  );
}

export default PostList;
