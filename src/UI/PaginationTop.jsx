import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {setCardsPerPage} from "../Pages/uiSlice";

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
  border-radius: 10px;
  background-color: var(--color-grey-100);
`;

function PaginationTop() {
  const {currentPage, cardsPerPage, searchedPostsQuantity} = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const start = (currentPage - 1) * cardsPerPage + 1;
  const end = currentPage * cardsPerPage < searchedPostsQuantity ? currentPage * cardsPerPage : searchedPostsQuantity;

  const cardsPerPageOptions = Array.from({length: 51}, (_, i, start = 24) => i + 1 + start);

  function handleSetCardsPerPage(e) {
    dispatch(setCardsPerPage(e.target.value));
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
    </Stats>
  );
}

export default PaginationTop;
