import styled, {keyframes} from "styled-components";
import TitleContainer from "../../UI/TitleContainer";
import CardLine from "../../UI/CardLine";
import Icon from "../../UI/Icon";
import GeneralButton from "../../UI/Buttons/GeneralButton";
import {useSelector} from "react-redux";
import parse from "html-react-parser";
import {useNavigate} from "react-router-dom";
import {htmlToText} from "html-to-text";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

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

const Container = styled.div`
  margin: 4rem auto;
  color: white;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 14rem) !important;
  max-width: 110rem;
  animation-name: ${fadeIn};
  animation-duration: 0.5s;
  animation-iteration-count: 1;
`;

const BodyContainer = styled.div`
  color: var(--color-grey-600);
  background-color: var(--color-grey-50);
  height: calc(100vh - 29rem) !important;
  padding: 2rem;
  overflow-y: scroll;
  word-wrap: break-word;
  word-break: break-all;
`;

const IconLarge = styled.div`
  align-items: center;
  fill: rgb(255, 255, 255);
  transform: scale(8);
  position: absolute;
  top: 50%;
  right: 20%;
  z-index: -1;
  opacity: 20%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.5rem;
  z-index: 2;
  white-space: nowrap;
  overflow-x: hidden;
  height: 11rem;
`;

const Span = styled.span`
  font-size: 1.25rem;
  color: var(--color-grey-400);
  padding: 0.2rem 0.4rem;
  background-color: var(--color-grey-100);
  border-radius: 10px;
  margin-top: auto;
`;

const H1 = styled.h1`
  white-space: nowrap;
`;

const Mode = styled.span`
  margin-top: auto;
  margin-left: auto;
  font-size: 1.75rem;
  background-color: var(${({category}) => `--color-${category}-20`});
  padding: 0.5rem 1rem;
  border-radius: 10px;
  height: 3.6rem;
  white-space: nowrap;
`;

const DescriptionBox = styled.p`
  width: 100%;
  padding: 2rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  border-radius: 25px;
  background-color: var(--color-${({category}) => category}-20);
`;

function EmptyPostViewer() {
  const navigate = useNavigate();
  const {title, category, content, description} = useSelector((state) => state.currentPost);
  const {isMarkDown, categories} = useSelector((state) => state.ui);
  const [techStack] = categories.filter((category) => category.toLowerCase().split(" ").join("") === category?.toLowerCase().split(" ").join(""));

  const categoryLower = category.split(" ").join("").toLowerCase();
  const postBody = parse(content);
  const body = htmlToText(content);

  function handleClose(e) {
    e.preventDefault();
    navigate("/app/posts");
  }

  return (
    <Container>
      <TitleContainer
        category={categoryLower}
        height={"15rem"}
        padding={"2rem"}
        flexDirection={"row"}
        alignItems={"start"}
        width={"100%"}
        position="relative"
        overflow="hidden"
      >
        <IconLarge>
          <Icon category={categoryLower} />
        </IconLarge>
        <GeneralButton category={categoryLower} type="close" onClick={handleClose}>
          <ion-icon name="close-outline" />
        </GeneralButton>
        <InfoContainer>
          <H1>{title || "New Post..."}</H1>
          <Span>Tech Stack: {techStack}</Span>
        </InfoContainer>
        <Mode category={categoryLower}>Edit Mode</Mode>
      </TitleContainer>
      <BodyContainer>
        <DescriptionBox category={categoryLower}>{description}</DescriptionBox>
        {isMarkDown ? (
          <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>
            {body}
          </Markdown>
        ) : (
          postBody
        )}
      </BodyContainer>
      <CardLine category={categoryLower} height={"2rem"} />
    </Container>
  );
}

export default EmptyPostViewer;
