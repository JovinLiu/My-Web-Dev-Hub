/* eslint-disable react/prop-types */
import styled from "styled-components";
import toast from "react-hot-toast";
import Modal from "../../UI/Modal";
import Confirm from "../../UI/Confirm";
import {toggleShowEditor, toggleIsMarkDown} from "../../Pages/uiSlice";
import {setPost, setIsPrivate, resetPost} from "./currentPostSlice";
import {useAddNewPostMutation, useUpdatePostMutation} from "../../Utils/data";
import {useDispatch, useSelector} from "react-redux";
import GeneralButton from "../../UI/Buttons/GeneralButton";
import {useNavigate} from "react-router-dom";

const ButtonContainer = styled.div`
  margin-top: auto;
  margin-left: auto;
  display: flex;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

function EditorButtonGroup({categoryLower, currentPost}) {
  const {isMarkDown} = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id, title, description, category, topic, content, isPrivate} = currentPost;

  const [addNewPost] = useAddNewPostMutation();
  const [updatePost] = useUpdatePostMutation();

  //react hook form
  const canISave = !title || !content || !category || !topic || !description;

  function handleResetCurrentPost() {
    dispatch(resetPost());
    toast.success("Post successfully emptied!");
  }

  function handleToggleIsPrivate(e) {
    e.preventDefault();

    if (!isPrivate) {
      toast.success("You can view this post only");
    }
    if (isPrivate) {
      toast.success("Post will be shared to everyone");
    }

    dispatch(setIsPrivate());
  }

  function handleToggleIsMarkDown(e) {
    e.preventDefault();

    if (!isMarkDown) {
      toast.success("MarkDown Editor");
    }
    if (isMarkDown) {
      toast.success("Text Editor");
    }

    dispatch(toggleIsMarkDown());
  }

  //save to localstorage
  function handleClickTempSave(e) {
    try {
      e.preventDefault();
      if (canISave) throw new Error("Please fill in all required fields.");
      localStorage.setItem("tempPost", JSON.stringify(currentPost));
      toast.success("Post saved to temporary storage.");
    } catch (error) {
      toast.error(error.message);
    }
  }

  //Load from localstorage
  function handleClickLoadTempSave(e) {
    e.preventDefault();
    const data = localStorage.getItem("tempPost");
    if (data) {
      const tempPost = JSON.parse(data);
      dispatch(setPost(tempPost));
      toast.success("Post loaded from temporary storage.");
    } else {
      toast.error("No post found in temporary storage.");
    }
  }

  //save to database
  async function handleSavePost(e) {
    try {
      e.preventDefault();
      if (canISave) throw new Error("Please fill in all required fields.");

      let res;

      if (id) {
        res = await updatePost({id, updatedPost: currentPost});
      } else {
        res = await addNewPost(currentPost);
      }

      if (res.data.status === "success") {
        toast.success("Post successfully saved!");
        navigate("/app/posts");
        dispatch(resetPost());
        dispatch(toggleShowEditor());
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <ButtonContainer>
      <GeneralButton category={categoryLower} type="primary" onClick={handleToggleIsPrivate}>
        {isPrivate ? <ion-icon name="lock-closed-outline" /> : <ion-icon name="globe-outline" />}
      </GeneralButton>
      <GeneralButton category={categoryLower} type="primary" onClick={handleToggleIsMarkDown}>
        {isMarkDown ? <ion-icon name="logo-markdown" /> : <ion-icon name="text-outline" />}
      </GeneralButton>
      <GeneralButton category={categoryLower} type="primary" onClick={handleClickLoadTempSave}>
        <ion-icon name="folder-outline" />
      </GeneralButton>
      <GeneralButton category={categoryLower} type="primary" onClick={handleClickTempSave}>
        <ion-icon name="save-outline" />
      </GeneralButton>
      <Modal>
        <Modal.Open openCode="delete">
          <GeneralButton category={categoryLower} type="primary">
            <ion-icon name="trash-bin-outline" />
          </GeneralButton>
        </Modal.Open>
        <Modal.Window verifyCode="delete">
          <Confirm onConfirm={handleResetCurrentPost} action="Empty" />
        </Modal.Window>
      </Modal>
      <GeneralButton category={categoryLower} type="primary" onClick={handleSavePost}>
        <ion-icon name="checkmark-outline" />
      </GeneralButton>
    </ButtonContainer>
  );
}

export default EditorButtonGroup;
