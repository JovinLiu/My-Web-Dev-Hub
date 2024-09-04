import styled from "styled-components";
import {useGetPostByIdQuery} from "../../Utils/data";
import {useParams} from "react-router-dom";
import Loader from "../../UI/Loader";
import TitleContainer from "../../UI/TitleContainer";
import CardLine from "../../UI/CardLine";

const Container = styled.div`
  margin: auto;
  padding: 4rem 4rem 2rem 4rem;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const BodyContainer = styled.div``;

function PostViewer() {
  const {id} = useParams();
  const {currentData: post = {}, isLoading} = useGetPostByIdQuery(id);

  if (isLoading) return <Loader />;

  console.log(post);

  return (
    <Container>
      <TitleContainer
        category={post.category.toLowerCase()}
        height={"15rem"}
        gap={"2rem"}
        padding={"1.4rem"}
        flexDirection={"column"}
        alignItems={"start"}
        width={"100%"}
      >
        <h1>{post.title}</h1>
        <p>{post.date}</p>
        <span>{post.category}</span>
      </TitleContainer>
      <BodyContainer>{post.body}</BodyContainer>
      <CardLine />
    </Container>
  );
}

export default PostViewer;
