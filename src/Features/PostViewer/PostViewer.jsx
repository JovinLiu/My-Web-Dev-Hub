import styled, {keyframes} from "styled-components";
import {useGetPostByIdQuery} from "../../Utils/data";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../UI/Loader";
import TitleContainer from "../../UI/TitleContainer";
import CardLine from "../../UI/CardLine";
import Icon from "../../UI/Icon";
import GeneralButton from "../../UI/Buttons/GeneralButton";

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
  margin: 4rem;
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
  overflow: scroll;
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

const ButtonContainer = styled.div`
  margin-top: auto;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 2;
`;

const Span = styled.span`
  font-size: 1.25rem;
  color: var(--color-grey-400);
  padding: 0.2rem 0.4rem;
  background-color: var(--color-grey-100);
  border-radius: 10px;
`;

function PostViewer() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {currentData: post = {}, isLoading} = useGetPostByIdQuery(id);

  function handleClose(e) {
    e.preventDefault();
    navigate(-1);
  }

  if (isLoading) return <Loader />;

  const category = post.category.toLowerCase();

  console.log(post);

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
      >
        <IconLarge>
          <Icon category={category} />
        </IconLarge>
        <GeneralButton category={category} type="close" onClick={handleClose}>
          <ion-icon name="close-outline" />
        </GeneralButton>
        <InfoContainer>
          <h1>{post.title}</h1>
          <Span>Posted on {post.date}</Span>
          <Span>Tech Stack: {post.category}</Span>
        </InfoContainer>
        <ButtonContainer>
          <GeneralButton category={category} type="primary">
            <ion-icon name="copy-outline" />
          </GeneralButton>
          <GeneralButton category={category} type="primary">
            <ion-icon name="create-outline" />
          </GeneralButton>
          <GeneralButton category={category} type="primary">
            <ion-icon name="mail-outline" />
          </GeneralButton>
          <GeneralButton category={category} type="primary">
            <ion-icon name="trash-outline" />
          </GeneralButton>
        </ButtonContainer>
      </TitleContainer>
      <BodyContainer>{post.body}</BodyContainer>
      <CardLine category={category} height={"2rem"} />
    </Container>
  );
}

export default PostViewer;
