import styled from "styled-components";

const Button = styled.button`
  color: var(--color-grey-50);
  padding: 0.5rem;
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
  return <Button>Add Post</Button>;
}

export default AddPostButton;
