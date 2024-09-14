/* eslint-disable react/prop-types */
import {useEffect} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import {setContent} from "./currentPostSlice";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../UI/Loader";

const Container = styled.div`
  height: calc(100vh - 31rem);
  width: 100%;
  position: relative;
  z-index: 0;
`;

const Background = styled.div`
  height: calc(100vh - 31rem);
  max-width: 110rem;
  position: absolute;
  background-color: var(--color-grey-50);
`;

const LoaderContainer = styled.div`
  position: absolute;
  z-index: 20;
  top: -10%;
  left: 45%;
`;

function TextBox() {
  const {content} = useSelector((state) => state.currentPost);
  const {isWorking} = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const toolbar = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{header: 1}, {header: 2}],
      [{list: "ordered"}, {list: "bullet"}],
      [{script: "sub"}, {script: "super"}],
      [{indent: "-1"}, {indent: "+1"}],
      [{direction: "rtl"}],
      [{size: ["small", false, "large", "huge"]}],
      [{header: [1, 2, 3, 4, 5, 6, false]}],
      [{color: []}, {background: []}],
      [{font: []}],
      [{align: []}],
      ["clean"],
      ["image", "video"]
    ]
  };

  function handleSetCurrentContent() {
    dispatch(setContent(document.querySelector(".ql-editor").innerHTML));
  }

  useEffect(() => {
    const quill = document.querySelector(".quill");
    const toolbar = document.querySelector(".ql-toolbar");
    const container = document.querySelector(".ql-container");
    const editor = document.querySelector(".ql-editor");

    if (quill) {
      quill.setAttribute("style", "height: calc(100vh - 31rem); display:flex; flex-direction: column;");
    }

    if (toolbar) {
      toolbar.setAttribute("style", "background-color: var(--color-grey-50);");
    }

    if (container) {
      container.setAttribute("style", "background-color: var(--color-grey-50); flex-grow: 1; overflow: scroll;");
    }

    if (editor) {
      editor.setAttribute("style", "font-size: 1.5rem; color: var(--color-grey-500); line-height: 2.5rem;");
    }
  }, []);

  return (
    <Container>
      {isWorking ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Background />
      )}
      <ReactQuill theme="snow" value={content} onChange={handleSetCurrentContent} modules={toolbar} />
    </Container>
  );
}

export default TextBox;
