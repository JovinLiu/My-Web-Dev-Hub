/* eslint-disable react/prop-types */
import styled from "styled-components";
import {setGoHome} from "../Pages/uiSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: auto;
  margin-top: 5rem;
  padding: 2rem 4rem;
  border-radius: 10px;
  font-size: 2rem;
  color: var(--color-blue-2);
  background-color: var(--color-blue-1);
`;

const Button = styled.button`
  height: 3.5rem;
  color: var(--color-grey-50);
  background-color: var(--color-blue-1);
  border: none;
  border-radius: 10px;
  transition: var(--transition-1);
  padding: 0 1rem;
  border: 1px solid var(--color-grey-50);
  white-space: nowrap;

  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
`;

function NoPostFound({message}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleClickGoBack() {
    dispatch(setGoHome());
    navigate("/app/posts");
  }

  return (
    <Div>
      <span>{message}</span>
      <Button onClick={handleClickGoBack}>Go Back</Button>
    </Div>
  );
}

export default NoPostFound;
