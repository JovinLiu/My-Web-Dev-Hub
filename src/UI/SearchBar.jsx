import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setSearchQuery} from "../Pages/uiSlice";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 45rem;
  gap: 2rem;
`;

const SearchResultDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;

const SerachResult = styled.span`
  color: var(--color-grey-700);
  width: 12rem;
  font-size: 1.4rem;
  margin-left: auto;
`;

const Input = styled.input`
  margin-left: 1rem;
  width: 30rem;
  height: 3.6rem;
  border-radius: 10px;
  padding-left: 30px;
  padding-right: 12rem;
  border: 2px solid var(--color-blue-1);
`;

const InputContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  position: relative;
`;

const IconContainer = styled.div`
  position: absolute;
  color: var(--color-grey-600);
  height: 3rem;
  font-size: 2.5rem;
  top: ${({top}) => top};
  left: ${({left}) => left};
  right: ${({right}) => right};
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const SearchButton = styled.button`
  padding: 0rem 0.5rem;
  font-size: 1.8rem;
  color: var(--color-grey-50);
  background-color: var(--color-blue-1);
  border: none;
  border-radius: 7px;
  &:hover {
    color: var(--color-grey-70s0);
    background-color: var(--color-blue-2);
  }
`;

const CloseButton = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  font-size: 2rem;
  border-radius: 50%;
  z-index: 3;
  color: var(--color-grey-50);
  background-color: var(--color-blue-1);
  border: none;
  transition: var(--transition-1);
  &:hover {
    color: var(--color-grey-70s0);
    background-color: var(--color-blue-2);
  }
`;

function SearchBar() {
  const {postsNum, totalPostsNum} = useSelector((state) => state.ui);
  const [keywords, setKeywords] = useState("");
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(
    function () {
      const callBack = (e) => {
        if (document.activeElement === document.querySelector(".ql-editor")) return;
        if (document.activeElement === document.querySelector(".title-input")) return;
        if (e.code === "Enter") inputEl.current.focus();
        if (e.code === "Escape") {
          inputEl?.current?.blur();
          dispatch(setSearchQuery(""));
        }
      };
      document.addEventListener("keydown", callBack);
      return removeEventListener("keydown", callBack);
    },
    [dispatch]
  );

  function handleSetSearchQuery(e) {
    e.preventDefault();
    dispatch(setSearchQuery(keywords));
    navigate("/app/posts");
  }

  function handleSetKeywords(e) {
    e.preventDefault();
    setKeywords(e.target.value);
  }

  function handleCleanKeywords(e) {
    e.preventDefault();
    setKeywords("");
    dispatch(setSearchQuery(""));
  }

  useEffect(
    function () {
      if (keywords === "") dispatch(setSearchQuery(""));
    },
    [keywords, dispatch]
  );

  return (
    <Container>
      <SearchResultDiv>
        <SerachResult>{totalPostsNum} posts in total</SerachResult>
        <SerachResult>{postsNum} posts found</SerachResult>
      </SearchResultDiv>
      <InputContainer>
        <IconContainer left="1.5rem">
          <ion-icon name="search-outline"></ion-icon>
        </IconContainer>
        <Input placeholder="Search Posts..." value={keywords} onChange={handleSetKeywords} ref={inputEl} />
        <IconContainer top="0.5rem" right="0.3rem">
          {keywords && (
            <Div>
              <SearchButton onClick={handleSetSearchQuery}>SEARCH</SearchButton>
              <CloseButton onClick={handleCleanKeywords}>
                <ion-icon name="close-outline" />
              </CloseButton>
            </Div>
          )}
        </IconContainer>
      </InputContainer>
    </Container>
  );
}

export default SearchBar;
