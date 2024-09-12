import {Link, useSearchParams} from "react-router-dom";
import styled from "styled-components";

/* eslint-disable react/prop-types */
const StyledLink = styled(Link)``;

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
