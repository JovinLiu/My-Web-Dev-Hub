import styled from "styled-components";
import HideButton from "../../UI/Buttons/HideButtonLeft";
import TextBox from "./TextBox";
import TitleForm from "./TitleForm";
import {useSelector} from "react-redux";

const LeftSide = styled.aside`
  width: 100%;
  height: 100%;
  //编辑器居中
  display: flex;
  justify-content: center;
  position: relative;
`;

const Container = styled.div`
  height: calc(100vh - 14rem) !important;
  margin: 4rem !important;
  width: 110rem !important;
  color: var(--color-grey-500);
  background-color: var(--color-grey-100);
  display: ${({showEditor}) => (showEditor ? "block" : "none")};
  transition: var(--transition-1);
`;

function PostEditor() {
  const showEditor = useSelector((state) => state.ui.showEditor);

  return (
    <LeftSide>
      <HideButton />
      {showEditor && (
        <Container showEditor={showEditor}>
          <TitleForm>
            <TextBox />
          </TitleForm>
        </Container>
      )}
    </LeftSide>
  );
}

export default PostEditor;
