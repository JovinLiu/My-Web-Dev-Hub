import styled from "styled-components";
import {setCurrentPage} from "../Pages/uiSlice";
import {useDispatch, useSelector} from "react-redux";

const Button = styled.div`
  cursor: pointer;
  text-align: center;
  height: 2.5rem;
  width: 2.5rem;
  font-size: 2rem;
  border-radius: 50%;
  color: var(--color-grey-50);
  background-color: var(--color-blue-1);
  border: none;
  transition: var(--transition-1);
  &:hover {
    color: var(--color-grey-70s0);
    background-color: var(--color-blue-2);
  }
`;

const PageButton = styled.div`
  cursor: pointer;
  text-align: center;
  height: 2.5rem;
  width: 2.5rem;
  font-size: 1.5rem;
  border-radius: 50%;
  color: var(--color-grey-${({currentPage, page}) => (currentPage === page ? "50" : "700")});
  background-color: var(--color-blue-${({currentPage, page}) => (currentPage === page ? "1" : "2")});
  border: none;
  transition: var(--transition-1);
  &:hover {
    color: var(--color-grey-${({currentPage, page}) => (currentPage === page ? "700" : "50")});
    background-color: var(--color-blue-${({currentPage, page}) => (currentPage === page ? "2" : "1")});
  }
`;

const Div = styled.div`
  display: flex;
  gap: 2rem;
`;

const Span = styled.span`
  font-size: 1.5rem;
  color: var(--color-grey-700);
  line-height: 1.5rem;
  visibility: ${({show}) => (show ? "block" : "hidden")};
`;

function Pagination() {
  //写后端时替代掉totalPostsNum
  //all posts是后端发来的aggregate的总数
  //每一个tag都是agregate的总数
  //如果searchQuery不为空，总数是searchedPosts的length
  const {currentPage, totalPostsNum, cardsPerPage} = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const maxPages = Math.ceil(totalPostsNum / cardsPerPage);
  const pageArr = Array.from({length: maxPages}, (_, i) => i + 1);
  const start = currentPage - 5 >= 0 && maxPages > 10 ? (currentPage > maxPages - 5 ? maxPages - 10 : currentPage - 5) : 0;
  const end = start + 10 <= maxPages ? start + 10 : maxPages;
  const showLeftDots = maxPages > 10 && currentPage - 5 > 0;
  const showRightDots = maxPages > 10 && currentPage < maxPages - 5;

  function handleClickPageDecrease() {
    const page = currentPage - 1 <= 0 ? 1 : currentPage - 1;
    dispatch(setCurrentPage(page));
  }

  function handleClickPage(e) {
    const page = e.target.textContent * 1;
    dispatch(setCurrentPage(page));
  }

  function handleClickPageIncrease() {
    const page = currentPage + 1 >= maxPages ? maxPages : currentPage + 1;
    dispatch(setCurrentPage(page));
  }

  return (
    <Div>
      {maxPages !== 1 && (
        <>
          <Button onClick={handleClickPageDecrease}>
            <ion-icon name="chevron-back-outline"></ion-icon>
          </Button>
          <Span show={showLeftDots}>...</Span>
          {pageArr.slice(start, end).map((page, i) => (
            <PageButton currentPage={currentPage} page={page} key={i} onClick={handleClickPage}>
              {page}
            </PageButton>
          ))}
          <Span show={showRightDots}>...</Span>
          <Button onClick={handleClickPageIncrease}>
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </Button>
        </>
      )}
    </Div>
  );
}

export default Pagination;
