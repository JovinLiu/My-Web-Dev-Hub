import styled from "styled-components";
import HideButton from "../../UI/Buttons/HideButtonLeft";
// import Markdown from "react-markdown";
import TextBox from "./TextBox";
import TitleForm from "../PostViewer/TitleForm";
import {useSelector} from "react-redux";

const Container = styled.aside`
  height: calc(100vh - 6rem);
  max-width: 50vw;
  color: var(--color-grey-500);
  position: relative;
  background-color: var(--color-grey-100);
  border-right: 1px solid var(--color-grey-500);
  transition: var(--transition-1);
  padding: 4rem 0rem 8rem 0rem;
`;

const Div = styled.div`
  max-width: 110rem;
  margin: 0 auto;
  display: ${({showEditor}) => (showEditor ? "block" : "none")};
  transition: var(--transition-1);
`;

function PostEditor() {
  const showEditor = useSelector((state) => state.ui.showEditor);

  return (
    <Container>
      <HideButton />
      <Div showEditor={showEditor}>
        <TitleForm />
        <TextBox />
        {/* <Markdown>text</Markdown> */}
      </Div>
    </Container>
  );
}

export default PostEditor;
