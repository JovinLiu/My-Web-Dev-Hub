/* eslint-disable react/prop-types */

import styled from "styled-components";

const Button = styled.button`
  text-decoration: none;
  color: var(--color-grey-700);
  transition: all, 0.2s;
  background: transparent;
  border: none;

  &:hover {
    font-size: 1.8rem;
    text-decoration: none;
    color: var(--color-blue-1);
    font-weight: bolder;
  }
`;

function MenuItem({category}) {
  const value = category.split(" ").join("").toLowerCase();

  return (
    <li>
      <Button value={value}>{category}</Button>
    </li>
  );
}

export default MenuItem;
