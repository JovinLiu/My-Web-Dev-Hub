/* eslint-disable react/prop-types */
import styled from "styled-components";
import GeneralButton from "./Buttons/GeneralButton";
import {useNavigate} from "react-router-dom";
const Heading = styled.h3`
  line-height: 1.4;
  font-size: 2rem;
  font-weight: 500;
`;

const StyledConfirm = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function Confirm({onConfirm, onCloseModal, action, disabled}) {
  const navigate = useNavigate();

  function handleClickConfirm() {
    onConfirm();
    onCloseModal();
    if (action === "Delete") navigate("/app/posts");
  }

  return (
    <StyledConfirm>
      <Heading>{action} current post</Heading>
      <p>Are you sure you want to {action === "Empty" ? "empty the editor" : "delete the post"}?</p>

      <div>
        <GeneralButton type="secondary" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </GeneralButton>
        <GeneralButton type="danger" disabled={disabled} onClick={handleClickConfirm}>
          Confirm
        </GeneralButton>
      </div>
    </StyledConfirm>
  );
}

export default Confirm;
