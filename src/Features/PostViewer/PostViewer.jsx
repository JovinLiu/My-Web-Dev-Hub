import styled, {keyframes} from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import parse from "html-react-parser";
import {htmlToText} from "html-to-text";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {useSelector} from "react-redux";
//Components
import {useGetPostByIdQuery} from "../../Services/PostsApi";
import Loader from "../../UI/Loader";
import TitleContainer from "../../UI/TitleContainer";
import CardLine from "../../UI/CardLine";
import Icon from "../../UI/Icon";
import GeneralButton from "../../UI/Buttons/GeneralButton";
import timeFormat from "../../Utils/timeFormat";
import ViewerButtonGroup from "./ViewerButtonGroup";
import useSyntaxHighlighter from "../../Hooks/useSyntaxHighlighter";

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
  color: var(--color-grey-600);
  background-color: var(--color-grey-50);
  height: calc(100vh - 29rem) !important;
  padding: 2rem;
  overflow-y: scroll;
  word-wrap: break-word;
  word-break: break-all;

  & li {
    position: relative;
    padding-left: 20px;
  }

  & li::before {
    content: "•"; /* 自定义标记 */
    position: absolute;
    left: 0rem;
  }

  & img {
    max-width: 100rem;
    display: flex;
    justify-self: center;
  }
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
  justify-content: space-between;
  height: 11rem;
  z-index: 2;
  white-space: nowrap;
  overflow-x: hidden;
`;

const Span = styled.span`
  font-size: 1.25rem;
  color: var(--color-grey-400);
  padding: 0rem 0.4rem;
  background-color: var(--color-grey-100);
  border-radius: 10px;
`;

const H1 = styled.h1`
  white-space: nowrap;
`;

const DescriptionBox = styled.p`
  width: 100%;
  padding: 2rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  border-radius: 10px;
  background-color: var(--color-${({category}) => category}-20);
`;

function PostViewer() {
  //Hooks
  const navigate = useNavigate();
  const {categories} = useSelector((state) => state.ui);
  const {id} = useParams();
  const {currentData = {}, isLoading, isFetching} = useGetPostByIdQuery(id);

  function handleClose(e) {
    e.preventDefault();
    navigate("/app/posts");
  }

  useSyntaxHighlighter(isFetching, isLoading, id);

  if (isLoading || isFetching) return <Loader />;

  //drived states and processing data
  const post = currentData?.data?.doc;
  const plainTextContent = htmlToText(post?.content);
  const htmlContent = parse(post?.content);
  const categoryLower = post?.category?.toLowerCase();
  const [category] = categories.filter((category) => category.split(" ").join("") === post?.category);
  const createdAtArr = timeFormat(post?.createdAt);
  const updatedAtArr = timeFormat(post?.updatedAt || "");
  const {user} = post;

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
          <H1>{post?.title}</H1>

          <Span>Posted on {createdAtArr[2] + ", " + createdAtArr[0] + ", " + createdAtArr[1]}</Span>

          {updatedAtArr && <Span>Amended on {updatedAtArr[2] + ", " + updatedAtArr[0] + ", " + updatedAtArr[1]}</Span>}

          <Span>Tech Stack: {category}</Span>
        </InfoContainer>
        <ViewerButtonGroup post={post} id={id} category={categoryLower} user={user} />
      </TitleContainer>
      <BodyContainer>
        <DescriptionBox category={categoryLower}>{post?.description}</DescriptionBox>
        {post?.isMarkdown ? (
          //remarkGfm这个好像不管用
          <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>
            {plainTextContent}
          </Markdown>
        ) : (
          <>{htmlContent}</>
        )}
      </BodyContainer>
      <CardLine category={categoryLower} height={"2rem"} />
    </Container>
  );
}

export default PostViewer;
