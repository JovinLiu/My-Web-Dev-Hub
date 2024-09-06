/* eslint-disable react/prop-types */
import styled from "styled-components";
import GeneralButton from "../../UI/Buttons/GeneralButton";
import TitleContainer from "../../UI/TitleContainer";
import {useNavigate} from "react-router-dom";
import CardLine from "../../UI/CardLine";
import {useDispatch, useSelector} from "react-redux";
import {toggleShowEditor, toggleIsMarkDown} from "../../Pages/uiSlice";
import {setCurrentTitle, setCurrentComposeTime, setCurrentCategory, resetCurrentPost} from "../PostEditor/currentPostSlice";
import {useEffect} from "react";
import {useAddNewPostMutation} from "../../Utils/data";
import toast from "react-hot-toast";

const TitleInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
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
`;

const DateDiv = styled.div`
  display: flex;
  flex-direction: rows;
  gap: 2rem;
  font-size: 1.25rem;
  margin-right: auto;
`;

function TitleForm({children}) {
  const navigate = useNavigate();
  const {isMarkDown, categories} = useSelector((state) => state.ui);
  const {currentTitle, currentComposeTime, curreentCategory, currentPostBody} = useSelector((state) => state.currentPost);
  const dispatch = useDispatch();
  const [addNewPost] = useAddNewPostMutation();
  // const [updatePost, {error: updateError, isLoading: isUpdating}] = useUpdatePostMutation();

  const categoryLower = curreentCategory?.toLowerCase() || "";

  function handleSetCurrentCategory(e) {
    e.preventDefault();
    dispatch(setCurrentCategory(e.target.value));
  }

  function handleSetCurrentTitle(e) {
    e.preventDefault();
    dispatch(setCurrentTitle(e.target.value));
  }

  function handleResetCurrentPost(e) {
    e.preventDefault();
    dispatch(resetCurrentPost());
  }

  function handleClose(e) {
    e.preventDefault();
    dispatch(toggleShowEditor());
    navigate("/app/posts");
  }

  function handleToggleIsMarkDown(e) {
    e.preventDefault();
    dispatch(toggleIsMarkDown());
  }

  function handleClickSave(e) {
    e.preventDefault();
    if (!currentTitle || !currentPostBody || !curreentCategory) return;

    const currentTempPost = {
      title: currentTitle,
      category: curreentCategory,
      date: currentComposeTime,
      body: currentPostBody
    };

    localStorage.setItem("tempPost", JSON.stringify(currentTempPost));
  }

  async function handleSaveNewPost(e) {
    try {
      e.preventDefault();
      if (!currentTitle || !currentPostBody || !curreentCategory) throw new Error("Please fill in all required fields.");

      const currentTempPost = {
        title: currentTitle,
        category: curreentCategory,
        date: currentComposeTime,
        body: currentPostBody
      };

      await addNewPost(currentTempPost);

      toast.success("New post saved successfully!");
      navigate("/app/posts");
      dispatch(resetCurrentPost());
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(
    function () {
      const options = {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        weekday: "long",
        second: "numeric",
        hour12: false
      };
      const time = new Intl.DateTimeFormat(navigator.language, options).format(new Date());
      dispatch(setCurrentComposeTime(time));
    },
    [dispatch]
  );

  return (
    <>
      <TitleContainer category={categoryLower} height="15rem" padding="2rem" flexDirection="row" alignItems="start" position="relative">
        <GeneralButton category={categoryLower} type="close" onClick={handleClose}>
          <ion-icon name="close-outline" />
        </GeneralButton>
        <TitleInput>
          <Input className="title-input" value={currentTitle} onChange={handleSetCurrentTitle} placeholder="Post title..." maxLength="200" required />
          <DateDiv>
            <span>
              Composed on <strong>{currentComposeTime}</strong>
            </span>
            <span>
              Revised on <strong>12</strong>
            </span>
          </DateDiv>
          <Select value={curreentCategory} onChange={handleSetCurrentCategory} required>
            <option value="">Tech Stack...</option>
            {categories.map((category, i) => (
              <option value={category.split(" ").join("").toLowerCase()} key={i}>
                {category}
              </option>
            ))}
          </Select>
        </TitleInput>
        <ButtonContainer>
          <GeneralButton category={categoryLower} type="primary" onClick={handleToggleIsMarkDown} active={isMarkDown}>
            <ion-icon name="logo-markdown" />
          </GeneralButton>
          <GeneralButton category={categoryLower} type="primary" onClick={handleClickSave}>
            <ion-icon name="save-outline" />
          </GeneralButton>
          <GeneralButton category={categoryLower} type="primary" onClick={handleResetCurrentPost}>
            <ion-icon name="trash-bin-outline" />
          </GeneralButton>
          <GeneralButton category={categoryLower} type="primary" onClick={handleSaveNewPost}>
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
