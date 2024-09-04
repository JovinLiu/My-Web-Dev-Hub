import styled, {keyframes} from "styled-components";
import {useGetPostByIdQuery} from "../../Utils/data";
import {useParams} from "react-router-dom";
import Loader from "../../UI/Loader";
import TitleContainer from "../../UI/TitleContainer";
import CardLine from "../../UI/CardLine";

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
  margin: auto;
  padding: 4rem 4rem 8rem 4rem;
  color: white;
  display: flex;
  flex-direction: column;
  max-width: 110rem;
  animation-name: ${fadeIn};
  animation-duration: 0.5s;
  animation-iteration-count: 1;
`;

const BodyContainer = styled.div`
  color: var(--color-grey-600);
  background-color: var(--color-grey-50);
  padding: 2rem;
`;

function PostViewer() {
  const {id} = useParams();
  const {currentData: post = {}, isLoading} = useGetPostByIdQuery(id);

  if (isLoading) return <Loader />;

  const category = post.category.toLowerCase();

  console.log(post);

  return (
    <Container>
      <TitleContainer
        category={category}
        height={"15rem"}
        gap={"1.5rem"}
        padding={"2rem"}
        flexDirection={"column"}
        alignItems={"start"}
        width={"100%"}
      >
        <h1>{post.title}</h1>
        <p>Posted on {post.date}</p>
        <span>{post.category}</span>
      </TitleContainer>
      <BodyContainer>{post.body}</BodyContainer>
      <CardLine category={category} height={"2rem"} />
    </Container>
  );
}

export default PostViewer;
