/* eslint-disable react/prop-types */
import styled from "styled-components";

const Div = styled.div`
  margin: auto;
  margin-top: 5rem;
  padding: 2rem 4rem;
  border-radius: 10px;
  font-size: 2rem;
  color: var(--color-blue-2);
  background-color: var(--color-blue-1);
`;

function NoPostFound({message}) {
  return (
    <Div>
      <span>{message}</span>
    </Div>
  );
}

export default NoPostFound;
