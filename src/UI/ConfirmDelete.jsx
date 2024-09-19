/* eslint-disable react/prop-types */
import {useDispatch, useSelector} from "react-redux";
import {setLogOut} from "../Pages/uiSlice";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import GeneralButton from "./Buttons/GeneralButton";
import styled from "styled-components";
import toast from "react-hot-toast";

const Column = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  gap: 2rem;
`;

const Span = styled.span`
  font-family: "Roboto", sans-serif;
  width: 24rem;
  font-size: 1.3rem;
  font-style: normal;
  word-wrap: break-word;
  white-space: break-spaces;
  text-align: center;
`;

const Input = styled.input`
  width: 21rem;
  height: 4rem;
  font-size: 1.3rem;
  border-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border: 2px solid var(--color-blue-1);
  background-color: var(--color-grey-200);
`;

function ConfirmDelete({setOpenConfirmDelete, deleteAccount}) {
  const {currentUserId} = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleClickCloseAccount(e) {
    e.preventDefault();
    const password = document.getElementById("closeAccountPassword").value;

    if (!password) return toast.error("Please provide password to close account!");

    const res = await deleteAccount({id: currentUserId, password});

    if (res.error) return toast.error("Something went wrong, please check your password!");

    if (res.data.status === "success") {
      Cookies.remove("jwt");
      dispatch(setLogOut());
      navigate("/");
      toast.success("Account successfully closed");
    }
  }

  function handleClickCancel() {
    setOpenConfirmDelete(false);
  }
  return (
    <Column>
      <Span>Are you sure to close your account?</Span>
      <Input
        type="password"
        placeholder="Provide password to confirm"
        required=""
        minLength="8"
        maxLength="30"
        name="password"
        id="closeAccountPassword"
      />
      <Row>
        <GeneralButton padding="0.5rem 2.2rem" fontSize="1.5rem" type="danger" onClick={handleClickCloseAccount}>
          Confirm
        </GeneralButton>
        <GeneralButton padding="0.5rem 2.2rem" fontSize="1.5rem" type="primary" onClick={handleClickCancel}>
          Cancel
        </GeneralButton>
      </Row>
    </Column>
  );
}

export default ConfirmDelete;
