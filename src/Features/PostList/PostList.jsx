import styled from "styled-components";
import {useGetPostsByCategoryQuery} from "../../Utils/data";
import PostCard from "./PostCard";
import Loader from "../../UI/Loader";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {setPostsNum} from "../../Pages/uiSlice";
import NoPostFound from "../../UI/NoPostFound";
import Pagination from "../../UI/Pagination";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

const CardContainer = styled.div`
  margin: auto;
  color: white;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  //看看要不要删除
  max-width: 160rem;
`;

function PostList() {
  const {currentTag, searchQuery, currentPage, cardsPerPage} = useSelector((state) => state.ui);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const query = currentTag === "AllPosts" ? "" : currentTag;
  const arg = {category: query, start: (currentPage - 1) * cardsPerPage, limit: cardsPerPage};
  const {currentData: posts = [], isFetching, isLoading} = useGetPostsByCategoryQuery(arg);
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
    [searchedPosts]
  );

  useEffect(
    function () {
      const searchResults =
        searchQuery.length > 0
          ? posts.filter((post) => `${post.title} ${post.body} ${post.category}`.toLowerCase().includes(searchQuery.toLowerCase()))
          : posts;
      setSearchedPosts(searchResults);
    },
    [searchQuery, posts]
  );

  if (isFetching || isLoading) return <Loader />;

  dispatch(setPostsNum(searchedPosts.length));

  if (posts.length === 0 && !isFetching)
    return (
      <Container>
        <NoPostFound message="No post found, Click Add Post button to create one!" />
      </Container>
    );

  if (searchQuery !== "" && searchedPosts.length === 0 && !isFetching)
    return (
      <Container>
        <NoPostFound message="No post found, try another keyword" />
      </Container>
    );

  return (
    <Container>
      <CardContainer ref={allCards}>
        {searchedPosts.map((post, i) => (
          <PostCard post={post} fadeInTime={i} key={post.id} />
        ))}
      </CardContainer>
      {searchedPosts.length !== 0 && <Pagination />}
    </Container>
  );
}

export default PostList;
