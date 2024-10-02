import {useState} from "react";
import styled from "styled-components";
import TitleListItem from "./TitleListItem";

/* eslint-disable react/prop-types */
const Li = styled.li`
  cursor: default;
  margin-top: 1.75rem;
  font-size: 1.5rem;
  max-width: 30rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  transition: var(--transition-1);
  font-weight: bolder;
`;

const Ol = styled.ol`
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-left: 4.5rem;
  max-width: 25rem;
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  gap: 1.5rem;
  transition: var(--transition-1);
  list-style: outside;
`;

const Button = styled.button`
  color: var(--color-grey-700);
  height: 2rem;
  width: 2rem;
  font-size: 1.6rem;
  background-color: var(--color-grey-50);
  border-radius: 50%;
  border: none;
  transition: var(--transition-1);
  white-space: nowrap;
  &:hover {
    background-color: var(--color-blue-2);
  }
`;

const TextButton = styled.button`
  border: none;
  background: none;
  color: var(--color-grey-700);
  white-space: pre-wrap;
  text-align: left;
  transition: var(--transition-1);
  &:hover {
    color: var(--color-grey-500);
  }
`;

function TopicListItem({topic, titles}) {
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(!open);
  }
  return (
    <>
      <Li>
        <Button onClick={handleClickOpen}>{open ? <ion-icon name="chevron-down-outline" /> : <ion-icon name="chevron-forward-outline" />}</Button>
        <TextButton onClick={handleClickOpen}>
          {topic} ({titles.length})
        </TextButton>
      </Li>
      {open && (
        <Ol>
          {titles.map((title, i) => (
            <TitleListItem postTitle={title} key={i} />
          ))}
        </Ol>
      )}
    </>
  );
}

export default TopicListItem;
