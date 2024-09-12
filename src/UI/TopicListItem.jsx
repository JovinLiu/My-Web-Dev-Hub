import {useState} from "react";
import styled from "styled-components";
import TitleListItem from "./titleListItem";

/* eslint-disable react/prop-types */
const Li = styled.li`
  margin-top: 1.75rem;
  font-size: 1.5rem;
  max-width: 30rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  transition: var(--transition-1);
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
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  font-size: 1.6rem;
  border-radius: 50%;
  background-color: var(--color-blue-1);
  color: var(--color-grey-50);
  border: none;
  transition: var(--transition-1);
  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
`;

const Span = styled.span`
  white-space: nowrap;
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
        <Span>{topic}</Span>
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
