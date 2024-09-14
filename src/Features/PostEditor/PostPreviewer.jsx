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
import {useEffect} from "react";
import Prism from "prismjs";

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
  font-size: 1.5rem;
  color: var(--color-grey-500);
  line-height: 2.5rem;
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

function PostPreviewer() {
  const navigate = useNavigate();
  const {title, category, content, description, isMarkdown} = useSelector((state) => state.currentPost);
  const {categories} = useSelector((state) => state.ui);
  const [techStack] = categories.filter((category) => category.toLowerCase().split(" ").join("") === category?.toLowerCase().split(" ").join(""));

  const categoryLower = category.split(" ").join("").toLowerCase();
  const body = htmlToText(content);
  const postBody = parse(content);

  useEffect(() => {
    // 函数用于高亮代码块
    const highlightCode = (blocks, language) => {
      blocks.forEach((block) => {
        const htmlStr = Prism.highlight(block.textContent, Prism.languages[language], language);
        block.innerHTML = htmlStr;
      });
    };

    // 获取不同语言的代码块
    const jsCodeBlocks = [
      ...document.querySelectorAll(".language-js"),
      ...document.querySelectorAll(".language-javascript"),
      ...document.querySelectorAll(".ql-syntax")
    ];
    const htmlCodeBlocks = document.querySelectorAll(".language-html");
    const cssCodeBlocks = document.querySelectorAll(".language-css");

    // 对不同语言的代码块进行高亮处理
    if (jsCodeBlocks.length) highlightCode(jsCodeBlocks, "javascript");
    if (htmlCodeBlocks.length) highlightCode(htmlCodeBlocks, "html");
    if (cssCodeBlocks.length) highlightCode(cssCodeBlocks, "css");

    const qlCodeContainer = document.querySelector(".ql-syntax");
    if (qlCodeContainer)
      qlCodeContainer.setAttribute(
        "style",
        "background: #1f2937; box-shadow: none; max-width: 100rem; display: block; padding: 1rem; margin: 0 auto; border-radius: 10px;overflow-x: scroll;"
      );
  }, [isMarkdown, content]); // 依赖项更新时重新执行

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
        {isMarkdown ? (
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

export default PostPreviewer;
