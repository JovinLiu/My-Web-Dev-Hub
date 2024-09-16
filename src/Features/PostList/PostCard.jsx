/* eslint-disable react/prop-types */
import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";
//Components
import CardLine from "../../UI/CardLine";
import Icon from "../../UI/Icon";
import TitleContainer from "../../UI/TitleContainer";
import timeFormat from "../../Utils/timeFormat";

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
  animation-duration: ${(props) => Math.cbrt(props.fadeintime) / 2}s;
  animation-iteration-count: 1;
  position: relative;
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

const Round = styled.div`
  background-color: var(--color-${({category}) => category}-100);
  display: flex;
  align-items: center;
  margin-left: auto;
  height: 4.5rem;
  width: 4.5rem;
  clip-path: circle();
`;

const Private = styled.div`
  position: absolute;
  font-size: 1.75rem;
  text-align: center;
  height: 2.25rem;
  width: 2.25rem;
  color: var(--color-grey-700);
  background-color: var(--color-grey-50);
  border-radius: 50%;
  right: 0;
  top: 0;
  transform: translate(-15%, 15%);
  z-index: 10;
`;

function PostCard({post, fadeintime}) {
  const {category, id, description, title, createdAt, isPrivate} = post;
  const categoryLower = category.toLowerCase();

  function calcWidth() {
    return (Math.random() * 500).toFixed(0) * 1;
  }

  let width = calcWidth();
  while (width < 200 || width > 350) {
    width = calcWidth();
  }

  const date = timeFormat(createdAt);

  return (
    <StyledCardWithLink to={`/app/viewer/${id}`} width={width} fadeintime={fadeintime}>
      {isPrivate ? (
        <Private>
          <ion-icon name="lock-closed-outline" />
        </Private>
      ) : null}
      <CardLine category={categoryLower} height={"5%"} />
      <TextContainer>{description.slice(0, 200)}</TextContainer>
      <TitleContainer category={categoryLower} height={"30%"} gap={"1rem"} padding={"1.4rem"} flexDirection={"row"} alignItems={"center"} link={Link}>
        <Info>
          <Title>
            <strong>{title}</strong>
          </Title>
          <CreatedAt>{date[0] + " at " + date[1]}</CreatedAt>
        </Info>
        <Round category={categoryLower}>
          <Icon category={categoryLower} />
        </Round>
      </TitleContainer>
    </StyledCardWithLink>
  );
}

export default PostCard;
