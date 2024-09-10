import Modal from "../Modal";
import Login from "../Login";
import styled from "styled-components";

const LoginButton = styled.button`
  padding: 0.5rem 0.3rem 0.3rem 0.3rem;
  height: 3.5rem;
  width: 9rem;
  border-radius: 10px;
  font-size: 1.5rem;
  color: var(--color-grey-50);
  background-color: var(--color-blue-1);
  border: none;
  transition: var(--transition-1);
  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
`;

function SignInUpButton() {
  return (
    <Modal>
      <Modal.Open openCode="signin">
        <LoginButton>Sign in/up</LoginButton>
      </Modal.Open>
      <Modal.Window verifyCode="signin">
        <Login />
      </Modal.Window>
    </Modal>
  );
}

export default SignInUpButton;
