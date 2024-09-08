import styled, {keyframes} from "styled-components";
import {useDeletePostMutation, useGetPostByIdQuery} from "../../Utils/data";
import {setCurrentId, setCurrentTitle, setCurrentComposeTime, setCurrentCategory, setCurrentPostBody} from "../PostEditor/currentPostSlice";
import {toggleShowEditor} from "../../Pages/uiSlice";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../UI/Loader";
import TitleContainer from "../../UI/TitleContainer";
import CardLine from "../../UI/CardLine";
import Icon from "../../UI/Icon";
import GeneralButton from "../../UI/Buttons/GeneralButton";
import parse from "html-react-parser";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {htmlToText} from "html-to-text";
import Modal from "../../UI/Modal";
import Confirm from "../../UI/Confirm";

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
  margin: 0rem auto;
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
  align-items: start;
  gap: 1.5rem;
  z-index: 2;
  white-space: nowrap;
  overflow-x: hidden;
`;

const Span = styled.span`
  font-size: 1.25rem;
  color: var(--color-grey-400);
  padding: 0.2rem 0.4rem;
  background-color: var(--color-grey-100);
  border-radius: 10px;
`;

const H1 = styled.h1`
  white-space: nowrap;
`;

const DateDiv = styled.div`
  display: flex;
  gap: 1.5rem;
`;

function PostViewer() {
  const navigate = useNavigate();
  const {categories} = useSelector((state) => state.ui);
  const {id} = useParams();
  const {currentData: post = {}, isLoading} = useGetPostByIdQuery(id);
  const [deletePost] = useDeletePostMutation();
  const dispatch = useDispatch();
  const [techStack] = categories.filter((category) => category.split(" ").join("") === post.category);

  function handleClose(e) {
    e.preventDefault();
    navigate("/app/posts");
  }

  if (isLoading) return <Loader />;

  async function handleClickClickToCopy() {
    navigator.clipboard.writeText(htmlToText(post.body));
    toast.success("Copied to clipboard!");
  }

  function handleUpdatePost() {
    dispatch(setCurrentId(post.id));
    dispatch(setCurrentTitle(post.title));
    dispatch(setCurrentComposeTime(post.date));
    dispatch(setCurrentCategory(post.category));
    dispatch(setCurrentPostBody(post.body));
    navigate("/app/editor");
    dispatch(toggleShowEditor(true));
  }

  function handleClickSharePost() {
    window.location.href = `mailto:?subject=${post.title}&body=${encodeURIComponent(htmlToText(post.body))}`;
    toast.success("Copied to your email!");
  }

  async function handleDeletePost() {
    try {
      await deletePost(id);
      toast.success("Post has been deleted successfully!");
      navigate("/app/posts");
    } catch (err) {
      toast.error(err.message);
    }
  }

  const postBody = parse(post.body);
  const category = post.category.toLowerCase();

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
          <H1>{post.title}</H1>
          <DateDiv>
            <Span>Posted on {post.date}</Span>
            {post.revisedDate && <Span>Revised on {post.revisedDate}</Span>}
          </DateDiv>
          <Span>Tech Stack: {techStack}</Span>
        </InfoContainer>
        <ButtonContainer>
          <GeneralButton category={category} type="primary" onClick={handleClickClickToCopy}>
            <ion-icon name="copy-outline" />
          </GeneralButton>
          <GeneralButton category={category} type="primary" onClick={handleUpdatePost}>
            <ion-icon name="create-outline" />
          </GeneralButton>
          <GeneralButton category={category} type="primary" onClick={handleClickSharePost}>
            <ion-icon name="mail-outline" />
          </GeneralButton>
          <Modal>
            <Modal.Open openCode="delete">
              <GeneralButton category={category} type="primary">
                <ion-icon name="trash-outline" />
              </GeneralButton>
            </Modal.Open>
            <Modal.Window verifyCode="delete">
              <Confirm onConfirm={handleDeletePost} action="Delete" />
            </Modal.Window>
          </Modal>
        </ButtonContainer>
      </TitleContainer>
      <BodyContainer>{postBody}</BodyContainer>
      <CardLine category={category} height={"2rem"} />
    </Container>
  );
}

export default PostViewer;
