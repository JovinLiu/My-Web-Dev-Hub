import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {toggleShowEditor} from "../../Pages/uiSlice";
import {useNavigate, useLocation} from "react-router-dom";

const Button = styled.button`
  color: var(--color-grey-50);
  padding: 0.5rem;
  font-size: 1.5rem;
  width: 10rem;
  background-color: var(--color-blue-1);
  border: none;
  border-radius: 10px;
  transition: var(--transition-1);

  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
`;

function AddPostButton() {
  const navigate = useNavigate();
  const showEditor = useSelector((state) => state.ui.showEditor);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClickAddPost = () => {
    if (location.pathname !== "/app/editor") navigate("editor");
    if (showEditor) return;
    dispatch(toggleShowEditor());
  };

  return <Button onClick={handleClickAddPost}>Add Post</Button>;
}

export default AddPostButton;
