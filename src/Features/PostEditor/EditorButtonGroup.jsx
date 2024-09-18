/* eslint-disable react/prop-types */
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import toast from "react-hot-toast";
//Components
import {useAddNewPostMutation, useUpdatePostMutation} from "../../Services/PostsApi";
import {setIsWorking, toggleShowEditor} from "../../Pages/uiSlice";
import {setPost, setIsPrivate, setIsMarkdown, resetPost} from "./currentPostSlice";
import Modal from "../../UI/Modal";
import Confirm from "../../UI/Confirm";
import GeneralButton from "../../UI/Buttons/GeneralButton";

const ButtonContainer = styled.div`
  margin-top: auto;
  margin-left: auto;
  display: flex;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

function EditorButtonGroup({categoryLower, currentPost}) {
  //Hooks
  const [isMarkDownMode, setIsMarkDownMode] = useState(false);
  const {isWorking, currentUserId} = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addNewPost, {isLoading: isCreating}] = useAddNewPostMutation();
  const [updatePost, {isLoading: isUpdating}] = useUpdatePostMutation();

  //get all fields
  const {id, title, createdAt, updatedAt, isMarkdown, description, category, topic, content, isPrivate} = currentPost;

  //Save Condition
  const canSave = !title || !content || !category || !topic || !description;

  useEffect(
    function () {
      dispatch(setIsWorking(isCreating || isUpdating));
    },
    [isCreating, isUpdating, dispatch]
  );

  //清空当前帖子
  function handleResetCurrentPost() {
    dispatch(resetPost());
    toast.success("Post successfully emptied!");
  }

  //切换帖子公开还是私有
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

  //切换mark down模式
  function handleToggleIsMarkDown(e) {
    e.preventDefault();

    if (!isMarkDownMode) {
      toast.success("MarkDown Editor");
    }
    if (isMarkDownMode) {
      toast.success("Text Editor");
    }

    setIsMarkDownMode(!isMarkDownMode);
  }

  //同步mark down模式
  useEffect(
    function () {
      dispatch(setIsMarkdown(isMarkDownMode));
    },
    [isMarkDownMode, dispatch]
  );

  //保存到localstorage（除去id）
  function handleClickTempSave(e) {
    try {
      e.preventDefault();
      if (canSave) throw new Error("Please fill in all required fields.");
      // eslint-disable-next-line no-unused-vars
      const {id, createdAt, updatedAt, user, ...post} = currentPost;
      localStorage.setItem("tempPost", JSON.stringify(post));
      toast.success("Post saved to temporary storage.");
    } catch (error) {
      toast.error(error.message);
    }
  }

  //从localstorage读取（除去id）
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

  //保存到数据库
  async function handleSavePost(e) {
    try {
      e.preventDefault();
      if (canSave) throw new Error("Please fill in all required fields.");

      //获取所有的image的element
      const formdata = new FormData();

      const images = document.querySelector(".ql-editor").getElementsByTagName("img");

      const imgNameArr = [];
      //https://blog.csdn.net/qq_16946803/article/details/121080836
      Array.from(images).map((image, i) => {
        if (!image.outerHTML.match(/:(.*?);/)) return;
        const imgType = image.outerHTML.match(/:(.*?);/)[1];

        const imgFormat = imgType.split("/")[1];
        const imgStr = image.outerHTML.split(",")[1].slice(0, -2);
        //如果第一次add post，没有id，文件名就变成了img--时间了，其实应该把起名这个放在后端进行
        const imgName = `img-${currentPost.id || currentPost.title}-${Date.now()}-${i}.${imgFormat}`;
        imgNameArr.push(imgName);

        const bytes = window.atob(imgStr);

        const arr = [];
        for (let i = 0; i < bytes.length; i++) {
          arr.push(bytes.charCodeAt(i));
        }

        const blob = new Blob([new Uint8Array(arr)], {type: imgType});
        formdata.append("imagefiles", blob, imgName);
      });

      //图片名称放入formData
      formdata.append("title", title);
      formdata.append("createdAt", createdAt || "");
      formdata.append("updatedAt", updatedAt || "");
      formdata.append("description", description);
      formdata.append("category", category);
      formdata.append("topic", topic);
      formdata.append("isPrivate", isPrivate);
      formdata.append("isMarkdown", isMarkdown);
      formdata.append("images", imgNameArr);
      formdata.append("user", currentUserId);

      let htmlStr = currentPost.content;

      if (imgNameArr.length !== 0)
        imgNameArr.map(
          (imgName) =>
            (htmlStr = htmlStr.replace(
              /<img[^>]*src=["']data:image\/[^'"]+;base64,[^'"]*["'][^>]*>/,
              `<img src="http://localhost:3000/images/post/${imgName}" alt="image">`
            ))
        );

      formdata.append("content", htmlStr);

      let res;

      if (id) {
        console.log("updating:", id);
        res = await updatePost({id, formdata});
      } else {
        console.log("add new post");
        res = await addNewPost(formdata);
      }

      if (res.data.status === "success") {
        toast.success("Post successfully saved!");
        dispatch(toggleShowEditor());
        dispatch(setIsWorking(false));
        if (id) navigate(`/app/viewer/${id}/`);
        if (!id) navigate(`/app/posts`);
        dispatch(resetPost());
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  //Render
  return (
    <ButtonContainer>
      <GeneralButton category={categoryLower} type="primary" onClick={handleToggleIsPrivate} disabled={isWorking}>
        {isPrivate ? <ion-icon name="lock-closed-outline" /> : <ion-icon name="globe-outline" />}
      </GeneralButton>
      <GeneralButton category={categoryLower} type="primary" onClick={handleToggleIsMarkDown} disabled={isWorking}>
        {isMarkDownMode ? <ion-icon name="logo-markdown" /> : <ion-icon name="text-outline" />}
      </GeneralButton>
      <GeneralButton category={categoryLower} type="primary" onClick={handleClickLoadTempSave} disabled={isWorking}>
        <ion-icon name="folder-outline" />
      </GeneralButton>
      <GeneralButton category={categoryLower} type="primary" onClick={handleClickTempSave} disabled={isWorking}>
        <ion-icon name="save-outline" />
      </GeneralButton>
      <Modal>
        <Modal.Open openCode="delete">
          <GeneralButton category={categoryLower} type="primary" disabled={isWorking}>
            <ion-icon name="trash-bin-outline" />
          </GeneralButton>
        </Modal.Open>
        <Modal.Window verifyCode="delete">
          <Confirm onConfirm={handleResetCurrentPost} action="Empty" />
        </Modal.Window>
      </Modal>
      {currentUserId && (
        <GeneralButton category={categoryLower} type="primary" onClick={handleSavePost} disabled={isWorking}>
          <ion-icon name="checkmark-outline" />
        </GeneralButton>
      )}
    </ButtonContainer>
  );
}

export default EditorButtonGroup;
