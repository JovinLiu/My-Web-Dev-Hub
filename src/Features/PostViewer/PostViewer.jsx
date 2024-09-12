import styled, {keyframes} from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../UI/Loader";
import TitleContainer from "../../UI/TitleContainer";
import CardLine from "../../UI/CardLine";
import Icon from "../../UI/Icon";
import GeneralButton from "../../UI/Buttons/GeneralButton";
import parse from "html-react-parser";
import {useSelector} from "react-redux";
import {useGetPostByIdQuery} from "../../Utils/data";
import timeFormat from "../../Utils/timeFormat";
import ViewerButtonGroup from "./viewerButtonGroup";

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
  border-radius: 25px;
  background-color: var(--color-${({category}) => category}-20);
`;

function PostViewer() {
  const navigate = useNavigate();
  const {categories} = useSelector((state) => state.ui);
  const {id} = useParams();
  const {currentData = {}, isLoading} = useGetPostByIdQuery(id);
  const post = currentData?.data?.doc;

  const [techStack] = categories.filter((category) => category.split(" ").join("") === post?.category);

  function handleClose(e) {
    e.preventDefault();
    navigate("/app/posts");
  }

  if (isLoading) return <Loader />;

  const content = parse(post.content);
  const category = post.category.toLowerCase();
  const date = timeFormat(post.createdAt);
  const updateDate = timeFormat(post.updatedAt || "");

  return (
    <Container>
      <TitleContainer
        category={category}
        height={"15rem"}
        padding={"2rem"}
        flexDirection={"row"}
        alignItems={"start"}
        width={"100%"}
        position="relative"
        overflow="hidden"
      >
        <IconLarge>
          <Icon category={category} />
        </IconLarge>
        <GeneralButton category={category} type="close" onClick={handleClose}>
          <ion-icon name="close-outline" />
        </GeneralButton>
        <InfoContainer>
          <H1>{post.title}</H1>

          <Span>Posted on {date[2] + ", " + date[0] + ", " + date[1]}</Span>

          {updateDate && <Span>Revised on {updateDate[2] + ", " + updateDate[0] + ", " + updateDate[1]}</Span>}

          <Span>Tech Stack: {techStack}</Span>
        </InfoContainer>
        <ViewerButtonGroup post={post} id={id} category={category} />
      </TitleContainer>
      <BodyContainer>
        <DescriptionBox category={category}>{post.description}</DescriptionBox>
        {content}
      </BodyContainer>
      <CardLine category={category} height={"2rem"} />
    </Container>
  );
}

export default PostViewer;
