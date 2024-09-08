import styled from "styled-components";

const Div = styled.div`
  margin: auto;
  padding: 2rem 4rem;
  border-radius: 10px;
  font-size: 2rem;
  color: var(--color-blue-2);
  background-color: var(--color-blue-1);
`;

function NoPostFound() {
  return (
    <Div>
      <span>No post found, Click Add Post button to create one!</span>
    </Div>
  );
}

export default NoPostFound;
