/* eslint-disable react/prop-types */
import styled from "styled-components";
import {Link} from "react-router-dom";
import CardTop from "../../UI/CardTop";
import Icon from "../../UI/Icon";
import TitleContainer from "../../UI/TitleContainer";

const StyledCardWithLink = styled(Link)`
  width: 100%;
  height: 20rem;
  color: var(--color-grey-700);
  background-color: var(--color-grey-200);
  border-radius: 1.5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  justify-self: stretch;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 5px 5px 10px rgb(170, 170, 170);
  text-decoration: none;
  &: hover {
    transform: scale(1.03);
  }
`;

const TextContainer = styled.p`
  height: 67%;
  padding: 1.2rem 2rem;
  font-size: 1.2rem;
  z-index: 0;
  overflow: hidden;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 80%;
`;

const Title = styled.span`
  white-space: nowrap;
  font-size: 1.6rem;
`;

const CreatedAt = styled.span`
  white-space: nowrap;
  font-size: 1.2rem;
`;

function PostCard({post}) {
  const category = post.category.toLowerCase();

  function shortTimeFormat(date) {
    const dateArr = date.split(", ");
    return dateArr[1] + " at " + dateArr[2];
  }

  return (
    <StyledCardWithLink to={`/app/viewer/`}>
      <CardTop category={category} />
      <TextContainer>{post.body.slice(0, 200)}</TextContainer>
      <TitleContainer category={category}>
        <Info>
          <Title>
            <strong>{post.title}</strong>
          </Title>
          <CreatedAt>{shortTimeFormat(post.date)}</CreatedAt>
        </Info>
        <Icon category={category} />
      </TitleContainer>
    </StyledCardWithLink>
  );
}

export default PostCard;
