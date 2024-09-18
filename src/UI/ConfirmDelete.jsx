/* eslint-disable react/prop-types */
import {useDispatch, useSelector} from "react-redux";
import {setLogOut} from "../Pages/uiSlice";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import GeneralButton from "./Buttons/GeneralButton";
import styled from "styled-components";

const Column = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
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
`;

function ConfirmDelete({setOpenConfirmDelete, deleteAccount}) {
  const {currentUserId} = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleClickCloseAccount(e) {
    e.preventDefault();
    const res = await deleteAccount(currentUserId);
    console.log(res.data.status);
    if (res.data.status === "success") {
      Cookies.remove("jwt");
      dispatch(setLogOut());
      navigate("/");
    }
  }

  function handleClickCancel() {
    setOpenConfirmDelete(false);
  }
  return (
    <Column>
      <Span>Are you sure to close your account? You will not be able to access all your posts if you close this account.</Span>
      <Row>
        <GeneralButton padding="0.5rem 1.5rem" fontSize="1.5rem" type="danger" onClick={handleClickCloseAccount}>
          Confirm
        </GeneralButton>
        <GeneralButton padding="0.5rem 1.5rem" fontSize="1.5rem" type="primary" onClick={handleClickCancel}>
          Cancel
        </GeneralButton>
      </Row>
    </Column>
  );
}

export default ConfirmDelete;
