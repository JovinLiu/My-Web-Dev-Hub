/* eslint-disable react/prop-types */
import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";
import CardTop from "./CardTop";
import Icon from "../../UI/Icon";
import TitleContainer from "./TitleContainer";

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
  color: var(--color-grey-700);
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
  box-shadow: 5px 5px 10px var(--color-grey-400);
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
    <StyledCardWithLink to={`/app/viewer/`} width={width} fadeInTime={fadeInTime}>
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

// //NOTE:利用InterSectionObserver实现4个seciton延时淡入viewport的效果
// const allSections = document.querySelectorAll(".section");

// function reveal(entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove("section--hidden");
//   observer.unobserve(entry.target);
// }
// const options2 = {root: null, thresholds: 0.2};
// const sectionsReveal = new IntersectionObserver(reveal, options2);

// allSections.forEach((section) => {
//   // console.log(section);
//   sectionsReveal.observe(section);
// });
// //NOTE:利用InterSectionObserver实现section2中每张图片延迟出现的特效
// const imgTargets = document.querySelectorAll("img[data-src]");

// function imgLazyLoad(entries, observer) {
//   const [entry] = entries;
//   console.log(entry);
//   if (entry.isIntersecting) {
//     entry.target.src = entry.target.dataset.src;
//     entry.target.addEventListener("load", function () {
//       entry.target.classList.remove("lazy-img");
//       observer.unobserve(entry.target);
//     });
//   }
// }
// const options3 = {root: null, thresholds: 0.5, rootMargin: "-100px"};
// const imgLazyLoadObserver = new IntersectionObserver(imgLazyLoad, options3);
// imgTargets.forEach((img) => {
//   imgLazyLoadObserver.observe(img);
// });
