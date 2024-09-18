import {useNavigate, useParams} from "react-router-dom";
import {useResetPasswordMutation} from "../Services/UsersApi";
import styled, {css} from "styled-components";
import {useState} from "react";
import GeneralButton from "../UI/Buttons/GeneralButton";
import Loader from "../UI/Loader";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {setCurrentUserId, setIsLoggedIn} from "./uiSlice";

const Div = styled.div`
  width: 30vw;
  height: 30vh;
  margin: calc(50vh - 6rem) auto;
  transform: translateY(-60%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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

const Input = styled.input`
  margin-left: 1rem;
  width: 25rem;
  height: 3.6rem;
  border-radius: 10px;
  padding-left: 15px;
  padding-right: 7rem;
  border: 2px solid var(--color-blue-1);
  background-color: var(--color-grey-200);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

function PasswordReset() {
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useParams();
  const [resetPassword, {isLoading: isUpdating}] = useResetPasswordMutation();

  function handleSetPassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  async function handleClickResetPassword(e) {
    e.preventDefault();
    const credentials = {token, password};
    const res = await resetPassword(credentials);
    if (res.data.status === "success") {
      const message = `Welcome back, ${res.data.user.name}`;
      toast.success(message);

      const expiresAtDate = new Date(res.data.tokenExpires);
      Cookies.set("jwt", res.data.token, {expires: expiresAtDate});

      const {id} = res.data.user;
      //BUG有时登录进去不显示自己的帖子
      dispatch(setCurrentUserId(id));
      dispatch(setIsLoggedIn(true));
      return navigate("/app");
    }
  }

  function handleClickHomePage() {
    navigate("/");
  }

  return (
    <>
      {isUpdating ? (
        <Loader />
      ) : (
        <Div>
          <Form>
            <Heading as="h2">Reset your password</Heading>
            <Input
              type="password"
              placeholder="••••••••"
              required="true"
              minLength="8"
              name="password"
              value={password}
              onChange={handleSetPassword}
            />
            <Row>
              <GeneralButton fontSize="1.75rem" type="primary" onClick={handleClickResetPassword}>
                Update Password
              </GeneralButton>
              <GeneralButton fontSize="1.75rem" type="primary" onClick={handleClickHomePage}>
                Home Page
              </GeneralButton>
            </Row>
          </Form>
        </Div>
      )}
    </>
  );
}

export default PasswordReset;
