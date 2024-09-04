import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
// import {usePosts} from "../Contexts/PostsContext";
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 45rem;
`;

const SerachResults = styled.span`
  color: var(--color-grey-700);
  display: inline-block;
  width: 12rem;
  margin-left: 3rem;
  font-size: 1.4rem;
`;

const Input = styled.input`
  margin-left: 1rem;
  width: 25rem;
  height: 3.6rem;
  border-radius: 10px;
  padding-left: 30px;
  padding-right: 35px;
  border: 2px solid var(--color-blue-1);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const IconContainer = styled.div`
  position: absolute;
  color: var(--color-grey-600);
  height: 3rem;
  font-size: 2.5rem;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
`;

const Button = styled.button`
  background: none;
  border: none;
`;

function SearchBar() {
  const [query, setQuery] = useState("");
  const inputEl = useRef(null);

  useEffect(function () {
    const callBack = (e) => {
      if (e.code === "Enter") inputEl.current.focus();
      if (e.code === "Escape") {
        inputEl.current.blur();
        setQuery("");
      }
    };
    document.addEventListener("keydown", callBack);
    return removeEventListener("keydown", callBack);
  }, []);

  return (
    <Container>
      <SerachResults>123 posts found</SerachResults>
      <InputContainer>
        <IconContainer left="1.5rem">
          <ion-icon name="search-outline"></ion-icon>
        </IconContainer>
        <Input placeholder="Search Posts..." value={query} onChange={(e) => setQuery(e.target.value)} ref={inputEl} />
        <IconContainer right="1rem">
          {query && (
            <Button onClick={() => setQuery("")}>
              <ion-icon name="close-circle-outline"></ion-icon>
            </Button>
          )}
        </IconContainer>
      </InputContainer>
    </Container>
  );
}

export default SearchBar;
