import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {setCardsPerPage, setShowLatest, setOnlyShowMyPosts} from "../Pages/uiSlice";

const Column = styled.div`
  padding: 0.75rem 1.5rem;
  margin: 1.5rem 0;
  margin-left: auto;
  font-size: 1.5rem;
  color: var(--color-grey-700);
  display: flex;
  flex-direction: ${({isColumn}) => (isColumn ? "column" : "row")};
  gap: 1rem;
  align-items: center;
  justify-content: space-around;
  background-color: var(--color-grey-50);
  border-radius: 10px;
  white-space: nowrap;
  overflow: hidden;
`;

const Row = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

const Select = styled.select`
  height: 2.2rem;
  border: 1px solid;
  border-radius: 10px;
  background-color: var(--color-grey-100);
`;

const Button = styled.button`
  height: 2.2rem;
  color: var(--color-grey-50);
  background-color: var(--color-blue-1);
  border: none;
  border-radius: 10px;
  transition: var(--transition-1);
  padding: 0 1rem;

  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
`;

function PaginationRange() {
  const {currentPage, cardsPerPage, searchedPostsQuantity, showLatest, showSideBar, showEditor, onlyShowMyPosts, currentUserId} = useSelector(
    (state) => state.ui
  );
  const dispatch = useDispatch();
  const start = (currentPage - 1) * cardsPerPage + 1;
  const end = currentPage * cardsPerPage < searchedPostsQuantity ? currentPage * cardsPerPage : searchedPostsQuantity;
  const isColumn = showSideBar && showEditor;

  const cardsPerPageOptions = [25, 50, 75, 100];

  function handleSetCardsPerPage(e) {
    dispatch(setCardsPerPage(e.target.value));
  }

  function handleClickSort() {
    dispatch(setShowLatest());
  }

  function handleClickOnlyShowMyPosts() {
    dispatch(setOnlyShowMyPosts());
  }

  return (
    <Column isColumn={isColumn}>
      <Row>
        <div>
          <strong>{start}</strong> - <strong>{end}</strong> of <strong>{searchedPostsQuantity}</strong> posts
        </div>
        <div>
          <Select value={cardsPerPage} onChange={handleSetCardsPerPage}>
            {cardsPerPageOptions.map((option, i) => (
              <option value={option} key={i}>
                {option}
              </option>
            ))}
          </Select>
          <span> posts/page</span>
        </div>
      </Row>
      <Row>
        <Button onClick={handleClickSort}>Show {showLatest ? "earliest" : "latest"}</Button>
        {currentUserId && <Button onClick={handleClickOnlyShowMyPosts}>{onlyShowMyPosts ? "Show all posts" : "Only show my posts"}</Button>}
      </Row>
    </Column>
  );
}

export default PaginationRange;
