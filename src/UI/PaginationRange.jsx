import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {setCardsPerPage, setShowLatest} from "../Pages/uiSlice";

const Stats = styled.div`
  font-size: 1.5rem;
  color: var(--color-grey-700);
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-around;
  height: 3rem;
  padding: 0 2rem;
  margin: 1.5rem 0;
  margin-left: auto;
  border-radius: 10px;
  background-color: var(--color-grey-50);
`;

const Select = styled.select`
  height: 2.2rem;
  border: 1px solid;
  border-radius: 10px;
  background-color: var(--color-grey-100);
`;

const Button = styled.button`
  padding: 0 1rem;
  height: 2.2rem;
  border-radius: 10px;
  border: 1px solid;
  background-color: var(--color-grey-100);
`;

function PaginationRange() {
  const {currentPage, cardsPerPage, searchedPostsQuantity, showLatest} = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const start = (currentPage - 1) * cardsPerPage + 1;
  const end = currentPage * cardsPerPage < searchedPostsQuantity ? currentPage * cardsPerPage : searchedPostsQuantity;

  const cardsPerPageOptions = [25, 50, 75, 100];

  function handleSetCardsPerPage(e) {
    dispatch(setCardsPerPage(e.target.value));
  }

  function handleClickSort() {
    dispatch(setShowLatest());
  }

  return (
    <Stats>
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
        <span> posts per page</span>
      </div>
      <Button onClick={handleClickSort}>show {showLatest ? "earliest" : "latest"}</Button>
    </Stats>
  );
}

export default PaginationRange;
