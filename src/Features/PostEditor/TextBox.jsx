/* eslint-disable react/prop-types */
import {useEffect} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import {setContent} from "./currentPostSlice";
import {useDispatch, useSelector} from "react-redux";

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

function TextBox() {
  const {content} = useSelector((state) => state.currentPost);
  const dispatch = useDispatch();
  useEffect(function () {
    document.querySelector(".quill").setAttribute("style", "height: calc(100vh - 31rem); display:flex; flex-direction: column;");
    document.querySelector(".ql-toolbar").setAttribute("style", "background-color: var(--color-grey-50)");
    document.querySelector(".ql-container").setAttribute("style", "background-color: var(--color-grey-50); flex-grow:1;overflow:scroll");
  }, []);

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

  return (
    <Container>
      <Background />
      <ReactQuill theme="snow" value={content} onChange={handleSetCurrentContent} modules={toolbar} />
    </Container>
  );
}

export default TextBox;
