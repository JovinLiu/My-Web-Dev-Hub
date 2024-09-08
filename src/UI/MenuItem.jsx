/* eslint-disable react/prop-types */

import {useSelector} from "react-redux";
import styled, {css} from "styled-components";

const actived = css`
  font-size: 1.8rem;
  text-decoration: none;
  color: var(--color-blue-1);
  font-weight: bolder;
`;

const Button = styled.button`
  ${({active}) => active && actived};
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
  const value = category.split(" ").join("");
  const currentTag = useSelector((state) => state.ui.currentTag);

  return (
    <li>
      <Button value={value} active={currentTag === value}>
        {category}
      </Button>
    </li>
  );
}

export default MenuItem;
