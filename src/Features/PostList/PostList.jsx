import styled from "styled-components";
import {useGetPostsByConditionsQuery} from "../../Utils/data";
import PostCard from "./PostCard";
import Loader from "../../UI/Loader";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {setSearchedPostsQuantity, setTotalPostsQuantity} from "../../Pages/uiSlice";
import NoPostFound from "../../UI/NoPostFound";
import Pagination from "../../UI/Pagination";
import PaginationTop from "../../UI/PaginationTop";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 5rem; */
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
  const category = currentTag === "AllPosts" ? "" : currentTag;

  const arg = {category, search: searchQuery, page: currentPage, limit: cardsPerPage};
  const {currentData = {}, isFetching, isLoading} = useGetPostsByConditionsQuery(arg);

  const dispatch = useDispatch();
  const allCards = useRef(null);

  const posts = currentData?.data?.docs;
  const {results} = currentData;
  const {totalPostsQuantity} = currentData;

  const showPagination = searchedPosts?.length !== 0 || !isFetching || !isLoading;

  useEffect(
    function () {
      dispatch(setTotalPostsQuantity(totalPostsQuantity));
    },
    [totalPostsQuantity, dispatch]
  );

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

  //用后端取代这个
  useEffect(
    function () {
      const searchResults =
        searchQuery.length > 0
          ? posts.filter((post) => `${post.title} ${post.body} ${post.category}`.toLowerCase().includes(searchQuery.toLowerCase()))
          : posts;
      setSearchedPosts(searchResults);
      //用后端取代这个
      dispatch(setSearchedPostsQuantity(results));
    },
    [dispatch, searchQuery, posts, searchedPosts, results]
  );

  if (isFetching || isLoading) return <Loader />;

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
      {showPagination && <PaginationTop />}
      <CardContainer ref={allCards}>
        {searchedPosts?.map((post, i) => (
          <PostCard post={post} fadeInTime={i} key={post.id} />
        ))}
      </CardContainer>
      {showPagination && <Pagination />}
    </Container>
  );
}

export default PostList;
