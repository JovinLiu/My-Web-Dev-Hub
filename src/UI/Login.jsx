/* eslint-disable react/prop-types */
import styled from "styled-components";
import GeneralButton from "./Buttons/GeneralButton";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  width: 35rem;
  padding: 2rem;
`;

const H3 = styled.h3`
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-style: normal;
`;

const Email = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Password = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 30rem;
  height: 3.6rem;
  border-radius: 10px;
  padding-left: 1rem;
  padding-right: 1rem;
  border: 2px solid var(--color-blue-1);
  background-color: var(--color-grey-200);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
`;

function Login({onCloseModal}) {
  const navigate = useNavigate();

  function handleClickForgetPassword(e) {
    e.preventDefault();
    try {
      toast.success("The reset token has been sent to your email!");
    } catch (err) {
      toast.error("Something went wrong with sending the reset token, please try it later.");
    } finally {
      onCloseModal();
    }
  }

  function handleClickSignInUp(e) {
    e.preventDefault();
    navigate("/app");
    console.log("welcome");
    onCloseModal();
  }

  function handleClickClose(e) {
    e.preventDefault();
    onCloseModal();
  }

  return (
    <Container>
      <GeneralButton type="close" onClick={handleClickClose}>
        <ion-icon name="close-outline" />
      </GeneralButton>
      <H3>Sign in/up your account</H3>
      <Email>
        <label htmlFor="email">Email Address</label>
        <Input type="email" placeholder="example@example.com" className="loginEmail" />
      </Email>
      <Password>
        <label htmlFor="password">Password</label>
        <Input type="password" placeholder="••••••••" required="" minlength="8" className="loginPassword" />
      </Password>
      <ButtonContainer>
        <GeneralButton type="primary" fontSize="1.5rem" padding="0.7rem 1rem 0.7rem 1rem" onClick={handleClickSignInUp}>
          SIGN IN/UP
        </GeneralButton>
        <GeneralButton type="primary" fontSize="1.5rem" padding="0.7rem 1rem 0.7rem 1rem" onClick={handleClickForgetPassword}>
          FORGET PASSWORD
        </GeneralButton>
      </ButtonContainer>
    </Container>
  );
}

export default Login;
