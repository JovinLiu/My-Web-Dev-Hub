/* eslint-disable react/prop-types */
import styled from "styled-components";
import GeneralButton from "../../UI/Buttons/GeneralButton";
import {useState} from "react";
import TitleContainer from "../../UI/TitleContainer";
import {Navigate} from "react-router-dom";
import CardLine from "../../UI/CardLine";

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
  const [category, setCategory] = useState();

  const categoryLower = category?.toLowerCase() || "";

  console.log(categoryLower);

  function handleSetCategory(e) {
    setCategory(e.target.value);
  }

  function handleClose(e) {
    e.preventDefault();
    Navigate(-1);
  }

  return (
    <>
      <TitleContainer category={categoryLower} height="15rem" padding="2rem" flexDirection="row" alignItems="start" position="relative">
        <GeneralButton category={category} type="close" onClick={handleClose}>
          <ion-icon name="close-outline" />
        </GeneralButton>
        <TitleInput>
          <Input
            // value={titleValue}
            // onChange={(e) => handleTitleInput(e)}
            placeholder="Post title..."
            maxLength="200"
            required
          />
          <DateDiv>
            <span>
              Composed on <strong>12</strong>
            </span>
            <span>
              Revised on <strong>12</strong>
            </span>
          </DateDiv>
          <Select value={category} onChange={handleSetCategory} required>
            {/* 这个看看可不可以改一下 */}
            <option value="">Tech Stack...</option>
            <option value="WebBasic">Web Basic</option>
            <option value="Javascript">Javascript</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="Sass">Sass</option>
            <option value="TailwindCSS">Tailwind CSS</option>
            <option value="React">React</option>
            <option value="Redux">Redux</option>
            <option value="NodeJS">NodeJS</option>
            <option value="Express">Express</option>
            <option value="MangoDB">MangoDB</option>
            <option value="Bootstrap">Bootstrap</option>
            <option value="ReactRouter">React Router</option>
            <option value="ReactQuery">React Query</option>
            <option value="NextJS">NextJS</option>
            <option value="Git">Git</option>
            <option value="Python">Python</option>
            <option value="Github">GitHub</option>
            <option value="Docker">Docker</option>
          </Select>
        </TitleInput>
        <ButtonContainer>
          <GeneralButton type="primary" category={categoryLower} color="var(--color-grey-50)">
            <ion-icon name="save-outline" />
          </GeneralButton>
          <GeneralButton type="primary" category={categoryLower} color="var(--color-grey-50)">
            <ion-icon name="trash-bin-outline" />
          </GeneralButton>
          <GeneralButton type="primary" category={categoryLower} color="var(--color-grey-50)">
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
