/* eslint-disable react/prop-types */
import styled from "styled-components";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {htmlToText} from "html-to-text";
import {useNavigate} from "react-router-dom";
//Components
import {useDeletePostMutation} from "../../Services/PostsApi";
import {toggleShowEditor} from "../../Pages/uiSlice";
import {setPost} from "../PostEditor/currentPostSlice";
import Modal from "../../UI/Modal";
import Confirm from "../../UI/Confirm";
import GeneralButton from "../../UI/Buttons/GeneralButton";

const ButtonContainer = styled.div`
  margin-top: auto;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

function ViewerButtonGroup({post, id, category}) {
  const {isWorking} = useSelector((state) => state.ui);
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleClickClickToCopy() {
    navigator.clipboard.writeText(htmlToText(post.body));
    toast.success("Copied to clipboard!");
  }

  function handleUpdatePost() {
    dispatch(setPost(post));
    navigate("/app/editor");
    dispatch(toggleShowEditor(true));
  }

  function handleClickSharePost() {
    window.location.href = `mailto:?subject=${post.title}&body=${encodeURIComponent(htmlToText(post.content))}`;
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
  return (
    <ButtonContainer>
      <GeneralButton category={category} type="primary" onClick={handleClickClickToCopy} disabled={isWorking}>
        <ion-icon name="copy-outline" />
      </GeneralButton>
      <GeneralButton category={category} type="primary" onClick={handleUpdatePost} disabled={isWorking}>
        <ion-icon name="create-outline" />
      </GeneralButton>
      <GeneralButton category={category} type="primary" onClick={handleClickSharePost} disabled={isWorking}>
        <ion-icon name="mail-outline" />
      </GeneralButton>
      <Modal>
        <Modal.Open openCode="delete">
          <GeneralButton category={category} type="primary" disabled={isWorking}>
            <ion-icon name="trash-outline" />
          </GeneralButton>
        </Modal.Open>
        <Modal.Window verifyCode="delete">
          <Confirm onConfirm={handleDeletePost} action="Delete" />
        </Modal.Window>
      </Modal>
    </ButtonContainer>
  );
}

export default ViewerButtonGroup;
