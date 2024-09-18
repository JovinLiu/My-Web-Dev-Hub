/* eslint-disable react/prop-types */
import styled, {css} from "styled-components";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
// Api;
import {useCheckingMutation, useSigninMutation, useSignupMutation, useForgetPasswordMutation} from "../Services/UsersApi";
// Components;
import GeneralButton from "./Buttons/GeneralButton";
import Loader from "../UI/Loader";
import {useState} from "react";
import Cookies from "js-cookie";
import {setCurrentUserId, setIsLoggedIn} from "../Pages/uiSlice";
import {useDispatch} from "react-redux";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  width: 35rem;
  padding: 2rem;
`;

const Heading = styled.h1`
  display: flex;
  align-items: center;
  font-family: "Roboto", sans-serif;

  font-style: normal;

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 1200;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.5rem;
      font-weight: 900;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 1.5rem;
      font-weight: 300;
    `}
`;

const InputField = styled.div`
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
  const dispatch = useDispatch();
  const [accountPage, setAccountPage] = useState("checking");
  const [email, setEmail] = useState("");
  const [checking, {isLoading: isChecking}] = useCheckingMutation();
  const [signup, {isLoading: isSigningUp}] = useSignupMutation();
  const [signin, {isLoading: isSigningIn}] = useSigninMutation();
  const [forgetPassword, {isLoading: isSending}] = useForgetPasswordMutation();

  async function handleClickForgetPassword(e) {
    e.preventDefault();
    if (!email) return toast.error("Please provide a vaild email to reset password.");
    try {
      const res = await forgetPassword(email);
      if (res.error) throw new Error(res.error.data.message);
      toast.success("The reset link has been sent to your email!");
      onCloseModal();
    } catch (err) {
      toast.error(err.message);
    }
  }

  function handleSetEmail(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }

  async function handleClickCheckingEmail(e) {
    e.preventDefault();
    if (!email) {
      return toast.error("Please provide your email to sign in or sign up");
    }

    const res = await checking({email});

    console.log(res.data.status);

    if (res.data.status === "signup") {
      setAccountPage("signup");
    }

    if (res.data.status === "signin") {
      setAccountPage("signin");
    }

    if (res.data.status === "inactive") {
      setAccountPage("inactive");
    }
  }

  async function handleClickSignInAndUp(e) {
    e.preventDefault();
    const password = document.getElementById("loginPassword")?.value;
    const name = document.getElementById("signupname")?.value;

    if (!email) {
      return toast.error("Please provide your email");
    }

    if (accountPage === "signup") {
      if (!password || !name) {
        return toast.error("Please provide your password and full name to sign up");
      }
    }

    if (accountPage === "signin") {
      if (!password) {
        return toast.error("Please provide your password to sign in");
      }
    }

    try {
      let res;
      if (accountPage === "signup") {
        res = await signup({email, password, name});
      } else if (accountPage === "signin") {
        res = await signin({email, password});
      }

      if (res.data?.status === "success") {
        dispatch(setCurrentUserId(res.data.user.id));
        const message = accountPage === "signup" ? `Welcome to myWebDevHub, an email has been sent to email` : `Welcome back, ${res.data.user.name}`;
        toast.success(message);
        onCloseModal();

        const expiresAtDate = new Date(res.data.tokenExpires);
        Cookies.set("jwt", res.data.token, {expires: expiresAtDate});

        dispatch(setIsLoggedIn(true));

        //BUG解决登录时不显示用户的帖子的问题
        return navigate("/app");
      }

      if (res.error) {
        const errorMsg = accountPage === "signup" ? "Something went wrong with your sign-up" : "Incorrect authentication";
        return toast.error(errorMsg);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }

  function handleClickClose(e) {
    e.preventDefault();
    onCloseModal();
  }

  if (isChecking || isSigningIn || isSigningUp || isSending) return <Loader fullscreen={false} />;

  if (accountPage === "inactive")
    return (
      <FormContainer onSubmit={handleClickSignInAndUp}>
        <GeneralButton type="close" onClick={handleClickClose}>
          <ion-icon name="close-outline" />
        </GeneralButton>
        <Heading as="h2">Inactive account</Heading>
        <Heading as="h4">Please contact admin to reset your acccount.</Heading>
      </FormContainer>
    );

  if (accountPage === "signup")
    return (
      <FormContainer onSubmit={handleClickSignInAndUp}>
        <GeneralButton type="close" onClick={handleClickClose}>
          <ion-icon name="close-outline" />
        </GeneralButton>
        <Heading as="h2">{`Seems you don't have an account with us`}</Heading>
        <Heading as="h4">Would you to sign up with provided email? Please also provide your full name and password to complete the sign-up</Heading>
        <InputField>
          <label htmlFor="loginPassword">Password</label>
          <Input type="password" placeholder="••••••••" required="" minLength="8" name="password" id="loginPassword" />
        </InputField>
        <InputField>
          <label htmlFor="signupname">Your Name</label>
          <Input type="name" placeholder="your full name" name="name" id="signupname" />
        </InputField>
        <ButtonContainer>
          <GeneralButton type="primary" fontSize="1.5rem" padding="0.7rem 1rem 0.7rem 1rem">
            SIGN UP
          </GeneralButton>
          <GeneralButton type="primary" fontSize="1.5rem" padding="0.7rem 1rem 0.7rem 1rem" onClick={handleClickForgetPassword}>
            FORGET PASSWORD
          </GeneralButton>
        </ButtonContainer>
      </FormContainer>
    );

  if (accountPage === "signin")
    return (
      <FormContainer onSubmit={handleClickSignInAndUp}>
        <GeneralButton type="close" onClick={handleClickClose}>
          <ion-icon name="close-outline" />
        </GeneralButton>
        <Heading as="h2">Sign in your account</Heading>
        <InputField>
          <label htmlFor="loginPassword">Password</label>
          <Input type="password" placeholder="••••••••" required="" minLength="8" name="password" id="loginPassword" />
        </InputField>
        <ButtonContainer>
          <GeneralButton type="primary" fontSize="1.5rem" padding="0.7rem 1rem 0.7rem 1rem">
            SIGN IN
          </GeneralButton>
          <GeneralButton type="primary" fontSize="1.5rem" padding="0.7rem 1rem 0.7rem 1rem" onClick={handleClickForgetPassword}>
            FORGET PASSWORD
          </GeneralButton>
        </ButtonContainer>
      </FormContainer>
    );

  return (
    <FormContainer>
      <GeneralButton type="close" onClick={handleClickClose}>
        <ion-icon name="close-outline" />
      </GeneralButton>
      <Heading as="h2">Sign in/up your account</Heading>
      <InputField>
        <label htmlFor="loginEmail">Email Address</label>
        <Input type="email" placeholder="example@example.com" name="email" id="loginEmail" onChange={handleSetEmail} />
      </InputField>
      <ButtonContainer>
        <GeneralButton type="primary" fontSize="1.5rem" padding="0.7rem 1rem 0.7rem 1rem" onClick={handleClickCheckingEmail}>
          SIGN IN/UP
        </GeneralButton>
        <GeneralButton type="primary" fontSize="1.5rem" padding="0.7rem 1rem 0.7rem 1rem" onClick={handleClickForgetPassword}>
          FORGET PASSWORD
        </GeneralButton>
      </ButtonContainer>
    </FormContainer>
  );
}

export default Login;
