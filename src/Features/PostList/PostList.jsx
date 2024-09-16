import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
//Components
import {useGetPostsByConditionsQuery} from "../../Services/PostsApi";
import {setSearchedPostsQuantity, setTotalPostsQuantity} from "../../Pages/uiSlice";
import PostCard from "./PostCard";
import Loader from "../../UI/Loader";
import NoPostFound from "../../UI/NoPostFound";
import Pagination from "../../UI/Pagination";
import PaginationRange from "../../UI/PaginationRange";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 160rem;
  margin: 0 auto;
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
  //Hooks
  const dispatch = useDispatch();
  const allCards = useRef(null);

  //获取UI state
  const {currentTag, searchQuery, currentPage, cardsPerPage, showLatest} = useSelector((state) => state.ui);
  const category = currentTag === "AllPosts" ? "" : currentTag;

  //获取后端数据
  const arg = {
    search: searchQuery,
    page: currentPage,
    limit: cardsPerPage,
    fields: "category,id,description,title,createdAt,isPrivate",
    sort: showLatest ? "" : "createdAt",
    category
  };

  const {currentData = {}, isFetching, isLoading} = useGetPostsByConditionsQuery(arg);
  const posts = currentData?.data?.docs;
  const {totalPostsQuantity, postsQuantityByQuery} = currentData;

  //Render Condition
  const showPagination = posts?.length !== 0 || !isFetching || !isLoading;

  //同步帖子数量的数据
  useEffect(
    function () {
      dispatch(setTotalPostsQuantity(totalPostsQuantity));
      dispatch(setSearchedPostsQuantity(postsQuantityByQuery));
    },
    [totalPostsQuantity, dispatch, postsQuantityByQuery]
  );

  //设置视口交互逻辑
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

      const options = {root: null, thresholds: 0.1, rootMargin: "-100px"};

      const cardObserver = new IntersectionObserver(revealCard, options);

      //隐藏看不到的card
      Array.from(allCards?.current?.childNodes).forEach((card) => {
        card.setAttribute("style", "opacity: 0%");
        cardObserver.observe(card);
      });

      return () => {
        if (cardObserver) cardObserver.disconnect();
      };
    },
    [posts]
  );

  //Render Loader
  if (isFetching || isLoading) return <Loader />;

  //Render no posts found
  if (posts?.length === 0 && !isFetching)
    return (
      <Container>
        <NoPostFound message="No post found, Click Add Post button to create one or empty the search bar!" />
      </Container>
    );

  //Render no posts found
  if (searchQuery !== "" && posts.length === 0 && !isFetching)
    return (
      <Container>
        <NoPostFound message="No post found, try another keyword" />
      </Container>
    );

  //Render Posts
  return (
    <Container>
      {showPagination && <PaginationRange />}
      <CardContainer ref={allCards}>
        {posts?.map((post, i) => (
          <PostCard post={post} fadeintime={i} key={post.id} />
        ))}
      </CardContainer>
      {showPagination && <Pagination />}
    </Container>
  );
}

export default PostList;
