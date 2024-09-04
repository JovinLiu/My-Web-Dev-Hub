/* eslint-disable react/prop-types */
import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";
import CardLine from "../../UI/CardLine";
import Icon from "../../UI/Icon";
import TitleContainer from "../../UI/TitleContainer";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate3D(0, 100%,0);
  }
  to {
    opacity: 1;
    transform: translate3D(0, 0 ,0);
  }
`;

const StyledCardWithLink = styled(Link)`
  width: ${(props) => props.width}px;
  height: 20rem;
  color: var(--color-grey-500);
  background-color: var(--color-grey-200);
  border-radius: 1.5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  justify-self: stretch;
  flex-grow: 1;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 5px 5px 10px var(--color-grey-100);
  text-decoration: none;
  animation-name: ${fadeIn};
  animation-duration: ${(props) => Math.cbrt(props.fadeInTime) / 2}s;
  animation-iteration-count: 1;
  &:hover {
    transform: scale(1.03);
  }
`;

const TextContainer = styled.p`
  height: 67%;
  padding: 1.2rem 2rem;
  font-size: 1.2rem;
  z-index: 0;
  overflow: hidden;
  color: var(--color-grey-400);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 80%;
`;

const Title = styled.span`
  color: var(--color-grey-700);
  white-space: nowrap;
  font-size: 1.6rem;
`;

const CreatedAt = styled.span`
  color: var(--color-grey-500);
  white-space: nowrap;
  font-size: 1.2rem;
`;

function PostCard({post, fadeInTime}) {
  const category = post.category.toLowerCase();

  function calcWidth() {
    return (Math.random() * 500).toFixed(0) * 1;
  }

  let width = calcWidth();
  while (width < 200 || width > 350) {
    width = calcWidth();
  }

  function shortTimeFormat(date) {
    const arr = date.split(", ");
    return arr[1] + " at " + arr[2];
  }

  return (
    <StyledCardWithLink to={`/app/viewer/${post.id}`} width={width} fadeInTime={fadeInTime}>
      <CardLine category={category} />
      <TextContainer>{post.body.slice(0, 200)}</TextContainer>
      <TitleContainer category={category} height={"30%"} gap={"1rem"} padding={"1.4rem"} flexDirection={"row"} alignItems={"center"} link={Link}>
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
