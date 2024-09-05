/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
// import {usePosts} from "../Contexts/PostsContext";

const Container = styled.div`
  height: calc(100vh - 6rem);
  width: 100%;
`;

const Background = styled.div`
  height: calc(100vh - 28.2rem);
  max-width: 110rem;
  background-color: var(--color-grey-50);
`;

function TextBox() {
  // const {bodyValue, setBodyValue, viewMode} = usePosts();

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

  const editorStyle = {
    height: "calc(100vh - 35rem)",
    maxWidth: "110rem",
    position: "absolute",
    top: "19rem",
    left: "cal(25vh - 55rem)"
  };

  return (
    <Container>
      <ReactQuill
        theme="snow"
        // value={bodyValue}
        // onChange={setBodyValue}
        modules={toolbar}
        style={editorStyle}
      />
      <Background />
    </Container>
  );
}

export default TextBox;
