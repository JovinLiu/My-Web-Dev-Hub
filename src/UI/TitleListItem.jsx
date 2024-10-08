import {Link, useSearchParams} from "react-router-dom";
import styled from "styled-components";

/* eslint-disable react/prop-types */
const StyledLink = styled(Link)`
  cursor: default;
  color: var(--color-blue-1);
  font-size: 1.25rem;
  transition: var(--transition-1);
  &:hover {
    font-size: 1.5rem;
  }
`;

const Li = styled.li``;

function TitleListItem({postTitle}) {
  const {title, _id} = postTitle;
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const to = `/app/viewer/${_id}${category ? `?category=${category}` : ""}`;

  return (
    <Li>
      <StyledLink to={to}>{title}</StyledLink>
    </Li>
  );
}

export default TitleListItem;
