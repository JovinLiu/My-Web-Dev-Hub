/* eslint-disable react/prop-types */
import styled from "styled-components";
import GeneralButton from "../../UI/Buttons/GeneralButton";
import TitleContainer from "../../UI/TitleContainer";
import {useNavigate} from "react-router-dom";
import CardLine from "../../UI/CardLine";
import {useDispatch, useSelector} from "react-redux";
import {toggleShowEditor} from "../../Pages/uiSlice";
import {setTitle, setCategory, setTopic, setDescription} from "./currentPostSlice";
import EditorButtonGroup from "./EditorButtonGroup";

const TitleInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 11rem;
  gap: 1rem;
`;

const Input = styled.input`
  grid-column: ${({column}) => column};
  width: ${({width}) => width};
  height: 3rem;
  border-radius: 10px;
  border: 2px solid var(--color-blue-1);
  padding-left: 1rem;
  color: var(--color-grey-700);
  border: 2px solid var(--color-blue-1);
  background-color: var(--color-grey-200);
`;

const InputDescription = styled.textarea`
  grid-column: ${({column}) => column};
  width: ${({width}) => width};
  height: 3rem;
  border-radius: 10px;
  border: 2px solid var(--color-blue-1);
  padding-left: 1rem;
  color: var(--color-grey-700);
  border: 2px solid var(--color-blue-1);
  background-color: var(--color-grey-200);
  transition: var(--transition-1);
  &:focus {
    position: absolute;
    top: 10rem;
    height: 30vh;
    z-index: 10;
  }
`;

const Select = styled.select`
  width: 15rem;
  height: 3rem;
  border-radius: 10px;
  padding-left: 1rem;
  color: var(--color-grey-700);
  border: 2px solid var(--color-blue-1);
  background-color: var(--color-grey-200);
`;

function TitleForm({children}) {
  const {categories} = useSelector((state) => state.ui);
  const currentPost = useSelector((state) => state.currentPost);
  const {title, description, category, topic} = currentPost;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryLower = category?.toLowerCase() || "";

  function handleSetCurrentCategory(e) {
    e.preventDefault();
    dispatch(setCategory(e.target.value));
  }

  function handleSetCurrentTitle(e) {
    e.preventDefault();
    dispatch(setTitle(e.target.value));
  }

  function handleSetCurrentTopic(e) {
    e.preventDefault();
    dispatch(setTopic(e.target.value));
  }

  function handleSetCurrentDescription(e) {
    e.preventDefault();
    dispatch(setDescription(e.target.value));
  }

  function handleClose(e) {
    e.preventDefault();
    dispatch(toggleShowEditor());
    navigate("/app/posts");
  }

  return (
    <>
      <TitleContainer position="relative" category={categoryLower} height="15rem" padding="2rem" flexDirection="row" alignItems="start">
        <GeneralButton category={categoryLower} type="close" onClick={handleClose}>
          <ion-icon name="close-outline" />
        </GeneralButton>
        <TitleInput>
          <Input
            column="1 / -1"
            width="20rem"
            className="title-topic"
            value={topic}
            onChange={handleSetCurrentTopic}
            placeholder="Post topic..."
            maxLength="200"
            required
          />
          <Input
            className="title-input"
            value={title}
            onChange={handleSetCurrentTitle}
            placeholder="Post title..."
            maxLength="200"
            required
            width="20rem"
          />
          <Select value={category} onChange={handleSetCurrentCategory} required>
            <option value="">Tech Stack...</option>
            {categories.map((category, i) => (
              <option value={category?.split(" ").join("")} key={i}>
                {category}
              </option>
            ))}
          </Select>
          <InputDescription
            className="title-description"
            value={description}
            onChange={handleSetCurrentDescription}
            placeholder="Write down the most critical thought of the post and it will be displayed on the card, maximum 400 characters."
            maxLength="400"
            column="1 / -1"
            width="36rem"
          />
        </TitleInput>
        <EditorButtonGroup categoryLower={categoryLower} currentPost={currentPost} />
      </TitleContainer>
      {children}
      <CardLine category={categoryLower} height="2rem" />
    </>
  );
}

export default TitleForm;
