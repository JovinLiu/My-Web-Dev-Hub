/* eslint-disable react/prop-types */
import styled from "styled-components";
import GeneralButton from "../../UI/Buttons/GeneralButton";
import TitleContainer from "../../UI/TitleContainer";
import {useNavigate} from "react-router-dom";
import CardLine from "../../UI/CardLine";
import {useDispatch, useSelector} from "react-redux";
import {toggleShowEditor, toggleIsMarkDown} from "../../Pages/uiSlice";
import {
  // setCurrentId,
  setCurrentTitle,
  setCurrentCategory,
  resetCurrentPost,
  setCurrentComposeTime,
  setCurrentReviseTime,
  resetComposeTime,
  setCurrentPostBody
} from "./currentPostSlice";
import {useAddNewPostMutation, useUpdatePostMutation} from "../../Utils/data";
import toast from "react-hot-toast";
import Modal from "../../UI/Modal";
import Confirm from "../../UI/Confirm";
import getTime from "../../Utils/getTime";
import timeFormat from "../../Utils/timeFormat";

const TitleInput = styled.div`
  display: flex;
  flex-direction: column;
  height: 11rem;
  gap: 1rem;
`;

const Input = styled.input`
  width: 25rem;
  height: 3.6rem;
  border-radius: 10px;
  border: 2px solid var(--color-blue-1);
  padding-left: 1rem;
  color: var(--color-grey-400);
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

const Select = styled.select`
  width: 20rem;
  height: 3.6rem;
  border-radius: 10px;
  border: 2px solid var(--color-blue-1);
  padding-left: 1rem;
  color: var(--color-grey-400);
  margin-top: auto;
`;

const DateDiv = styled.div`
  display: flex;
  flex-direction: rows;
  gap: 2rem;
  font-size: 1.25rem;
  margin-right: auto;
`;

const Span = styled.span`
  font-size: 1.25rem;
  color: var(--color-grey-400);
  padding: 0.2rem 0.4rem;
  background-color: var(--color-grey-100);
  border-radius: 10px;
`;

function TitleForm({children}) {
  const navigate = useNavigate();
  const {isMarkDown, categories} = useSelector((state) => state.ui);
  const {currentId, currentTitle, currentComposeTime, currentReviseTime, currentCategory, currentPostBody} = useSelector(
    (state) => state.currentPost
  );
  const dispatch = useDispatch();
  const [addNewPost] = useAddNewPostMutation();
  const [updatePost] = useUpdatePostMutation();

  const categoryLower = currentCategory?.toLowerCase() || "";
  const date = timeFormat(currentComposeTime);

  function handleSetCurrentCategory(e) {
    e.preventDefault();
    dispatch(setCurrentCategory(e.target.value));
  }

  function handleSetCurrentTitle(e) {
    e.preventDefault();
    dispatch(setCurrentTitle(e.target.value));
  }

  function handleResetCurrentPost() {
    dispatch(resetCurrentPost());
    toast.success("Post successfully emptied!");
  }

  function handleClose(e) {
    e.preventDefault();
    dispatch(toggleShowEditor());
    navigate("/app/posts");
  }

  function handleToggleIsMarkDown(e) {
    e.preventDefault();

    if (!isMarkDown) {
      toast.success("MarkDown Mode");
    }
    if (isMarkDown) {
      toast.success("Text Mode");
    }

    dispatch(toggleIsMarkDown());
  }

  function handleClickTempSave(e) {
    try {
      e.preventDefault();
      if (!currentTitle || !currentPostBody || !currentCategory) throw new Error("Please fill in all required fields.");

      const currentTempPost = {
        id: currentId,
        title: currentTitle,
        category: currentCategory,
        date: currentComposeTime,
        revisedDate: currentReviseTime,
        body: currentPostBody
      };

      localStorage.setItem("tempPost", JSON.stringify(currentTempPost));
      toast.success("Post saved to temporary storage.");
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleClickLoadTempSave(e) {
    e.preventDefault();
    const data = localStorage.getItem("tempPost");
    if (data) {
      const tempPost = JSON.parse(data);
      console.log(tempPost);
      dispatch(setCurrentTitle(tempPost.title));
      dispatch(setCurrentCategory(tempPost.category));
      dispatch(setCurrentComposeTime(tempPost.date));
      dispatch(setCurrentReviseTime(tempPost.revisedDate));
      dispatch(setCurrentPostBody(tempPost.body));
      toast.success("Post loaded from temporary storage.");
    } else {
      toast.error("No post found in temporary storage.");
    }
  }

  async function handleSavePost(e) {
    try {
      e.preventDefault();
      if (!currentTitle || !currentPostBody || !currentCategory) throw new Error("Please fill in all required fields.");

      const time = getTime();

      const currentPost = {
        id: currentId,
        title: currentTitle,
        category: currentCategory,
        date: currentId ? currentComposeTime : time,
        revisedDate: currentId && time,
        body: currentPostBody
      };

      if (currentId) {
        await updatePost({id: currentId, updatedPost: currentPost});
      } else {
        await addNewPost(currentPost);
      }

      toast.success("New post saved successfully!");
      navigate("/app/posts");
      dispatch(resetCurrentPost());
      dispatch(resetComposeTime());
      dispatch(toggleShowEditor());
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <TitleContainer category={categoryLower} height="15rem" padding="2rem" flexDirection="row" alignItems="start" position="relative">
        <GeneralButton category={categoryLower} type="close" onClick={handleClose}>
          <ion-icon name="close-outline" />
        </GeneralButton>
        <TitleInput>
          <Input className="title-input" value={currentTitle} onChange={handleSetCurrentTitle} placeholder="Post title..." maxLength="200" required />
          <DateDiv>
            {currentId ? (
              <Span>
                Was composed on <strong>{date[2] + ", " + date[0] + ", " + date[1]}</strong>
              </Span>
            ) : (
              ""
            )}
          </DateDiv>
          <Select value={currentCategory} onChange={handleSetCurrentCategory} required>
            <option value="">Tech Stack...</option>
            {categories.map((category, i) => (
              <option value={category?.split(" ").join("")} key={i}>
                {/* <option value={category} key={i}> */}
                {category}
              </option>
            ))}
          </Select>
        </TitleInput>
        <ButtonContainer>
          <GeneralButton category={categoryLower} type="primary" onClick={handleToggleIsMarkDown} active={isMarkDown}>
            <ion-icon name="logo-markdown" />
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
      </TitleContainer>
      {children}
      <CardLine category={categoryLower} height="2rem" />
    </>
  );
}

export default TitleForm;
