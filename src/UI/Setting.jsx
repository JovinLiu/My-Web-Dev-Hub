/* eslint-disable react/prop-types */
import styled, {css} from "styled-components";
// Components;
import GeneralButton from "./Buttons/GeneralButton";
import {useSelector} from "react-redux";
import {useState} from "react";
import Loader from "./Loader";
import {useDeleteAccountMutation} from "../Services/UsersApi";
import ConfirmDelete from "./ConfirmDelete";

const Container = styled.div`
  max-width: 80rem;
  max-height: 50rem;
  display: flex;
  flex-direction: row;
  padding: 2rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-left: 20%;
`;

const Row = styled.div`
  display: flex;
  gap: 2rem;
`;

const FormContainer = styled.form`
  width: calc(80rem - 25rem - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Profile = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  border-right: 1px solid var(--color-grey-500);
`;

const Avatar = styled.img`
  margin: 0rem 2.5rem;
  display: block;
  width: 15rem;
  aspect-ratio: 1;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-200);
`;

const Heading = styled.h1`
  display: flex;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  word-wrap: break-word;
  white-space: break-spaces;

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

const Label = styled.label`
  font-family: "Roboto", sans-serif;
  font-size: 2rem;
  font-weight: 600;
  font-style: normal;
  word-wrap: break-word;
  white-space: break-spaces;
`;

const Input = styled.input`
  width: 25rem;
  height: 3.6rem;
  font-size: 1.4rem;
  border-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border: 2px solid var(--color-blue-1);
  background-color: var(--color-grey-200);
`;

const Span = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  font-style: normal;
  word-wrap: break-word;
  white-space: break-spaces;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

function Setting({onCloseModal}) {
  const {currentUser} = useSelector((state) => state.ui);
  const {photo} = currentUser;
  const [name, setName] = useState(currentUser.name);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deleteAccount, {isLoading: isDeleting}] = useDeleteAccountMutation();

  const src = !photo.startsWith("default") ? `http://localhost:3000/images/user/${photo}` : "/default-user.jpg";

  function handleClickClose(e) {
    e.preventDefault();
    onCloseModal();
  }

  function handleSetNameChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleClickUpdatePassword(e) {
    e.preventDefault();

    const oldPass = document.getElementById("previousPassword").value;
    const newPass = document.getElementById("newPassword").value;
    console.log(oldPass, newPass);
  }

  function handleClickUpdateName(e) {
    e.preventDefault();
    console.log("update name");
  }

  async function handleClickCloseAccount(e) {
    e.preventDefault();
    setOpenConfirmDelete(!openConfirmDelete);
  }

  if (isDeleting) return <Loader fullscreen={false} />;

  return (
    <Container>
      <GeneralButton type="close" onClick={handleClickClose}>
        <ion-icon name="close-outline" />
      </GeneralButton>
      <Profile>
        <Avatar src={src} alt="User-avatar" />
        <TextDiv>
          <Heading as="h3">{currentUser.name}</Heading>
          <Heading as="h4">A full stack web developer</Heading>
        </TextDiv>
        {openConfirmDelete ? (
          <ConfirmDelete deleteAccount={deleteAccount} setOpenConfirmDelete={setOpenConfirmDelete} />
        ) : (
          <>
            <GeneralButton padding="0.5rem 1.5rem" fontSize="1.4rem" type="primary">
              Upload your photo
            </GeneralButton>
            <GeneralButton padding="0.5rem 1.5rem" fontSize="1.4rem" type="danger" onClick={handleClickCloseAccount}>
              Close account
            </GeneralButton>
          </>
        )}
      </Profile>
      <FormContainer>
        <Column>
          <Label>Update your password</Label>
          <Input type="password" placeholder="Previous Password" required="" minLength="8" maxLength="30" name="password" id="previousPassword" />
          <Row>
            <Input type="password" placeholder="New Password" required="" minLength="8" maxLength="30" name="password" id="newPassword" />
            <GeneralButton fontSize="1.4rem" type="primary" onClick={handleClickUpdatePassword}>
              Update Change
            </GeneralButton>
          </Row>
        </Column>
        <Column>
          <Label>Update your name</Label>
          <Input value={name} onChange={handleSetNameChange} maxLength="100" />
          <Row>
            <Input placeholder="Some words to describe yourself" value={undefined} onChange={undefined} maxLength="200" />
            <GeneralButton fontSize="1.4rem" type="primary" onClick={handleClickUpdateName}>
              Update Change
            </GeneralButton>
          </Row>
        </Column>
        <Column>
          <Span>You have contributed 9812387 posts! </Span>
        </Column>
      </FormContainer>
    </Container>
  );
}

export default Setting;
