import {useState} from "react";
import styled from "styled-components";
// import {usePosts} from "../Contexts/PostsContext";
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 45rem;
`;

const SerachResults = styled.span`
  color: var(--color-grey-400);
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
  const [keywords, setKeywords] = useState("");
  // const {searchQuery, viewMode, searchedPosts, dispatch} = usePosts();

  // function handleSearchQueryChange(e) {
  //   dispatch({type: "setSearchQuery", payload: e.target.value});
  // }

  return (
    <Container>
      <SerachResults>123 posts found</SerachResults>
      <InputContainer>
        <IconContainer left="1.5rem">
          <ion-icon name="search-outline"></ion-icon>
        </IconContainer>
        <Input placeholder="Search Posts..." value={keywords} onChange={(e) => setKeywords(e.target.value)} />
        <IconContainer right="1rem">
          {keywords && (
            <Button onClick={() => setKeywords("")}>
              <ion-icon name="close-circle-outline"></ion-icon>
            </Button>
          )}
        </IconContainer>
      </InputContainer>
    </Container>
  );
}

export default SearchBar;
