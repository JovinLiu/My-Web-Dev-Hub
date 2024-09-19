/* eslint-disable react/prop-types */
import styled, {css} from "styled-components";
// Components;
import GeneralButton from "./Buttons/GeneralButton";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Loader from "./Loader";
import {useDeleteAccountMutation, useUpdateMeMutation, useUpdateMyPhotoMutation, useUpdatePasswordMutation} from "../Services/UsersApi";
import ConfirmDelete from "./ConfirmDelete";
import toast from "react-hot-toast";
import {setCurrentUser} from "../Pages/uiSlice";
import Cookies from "js-cookie";
import {useGetMyPostsStatsQuery} from "../Services/PostsApi";
import {host} from "../Utils/config";

const Container = styled.div`
  max-width: 80rem;
  max-height: 50rem;
  display: flex;
  flex-direction: row;
  padding: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 10rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-left: 12%;
`;

const Row = styled.div`
  display: flex;
  gap: 2rem;
`;

const FormContainer = styled.form`
  width: calc(80rem - 30rem - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Profile = styled.div`
  width: 30rem;
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

const PhotoButton = styled.label`
  font-size: 1.4rem;
  font-style: normal;
  word-wrap: break-word;
  white-space: break-spaces;
  transition: var(--transition-1);
  padding: 0.5rem 1.5rem;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  color: var(--color-grey-50);
  background-color: var(--color-blue-1);
  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
`;

const PhotoInputHidden = styled.input`
  position: absolute;
  visibility: hidden;
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
  word-wrap: break-word;
  white-space: break-spaces;
  padding: 0.6rem 1.5rem;
  background-color: var(--color-grey-200);
  border-radius: 10px;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

function Setting({onCloseModal}) {
  const {currentUser, currentUserId} = useSelector((state) => state.ui);
  const {photo} = currentUser;
  const dispatch = useDispatch();
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deleteAccount, {isLoading: isDeleting}] = useDeleteAccountMutation();
  const [updateMe, {isLoading: isUpdating}] = useUpdateMeMutation();
  const [updatePassword, {isLoading: isUpdatingPassword}] = useUpdatePasswordMutation();
  const [updateMyPhoto, {isLoading: isUpdatingPhoto}] = useUpdateMyPhotoMutation();
  const {currentData = {}, refetch} = useGetMyPostsStatsQuery();

  const src = !photo.startsWith("default") ? `http://${host}/images/user/${photo}` : "/default-user.jpg";

  useEffect(() => {
    refetch();
  }, [currentUserId, refetch]);

  function handleClickClose(e) {
    e.preventDefault();
    onCloseModal();
  }

  function handleSetNameChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSetBioChange(e) {
    e.preventDefault();
    setBio(e.target.value);
  }

  async function handleClickUpdatePassword(e) {
    e.preventDefault();

    const password = document.getElementById("currentPass").value;
    const newPassword = document.getElementById("newPass").value;

    if (!password || !newPassword) return toast.error("Please provide your current password and new password!");

    const credentials = {currentUserId, password, newPassword};
    const res = await updatePassword(credentials);

    if (res.error) return toast.error("Something went wrong, please check your current password and new password!");

    if (res.data?.status === "success") {
      const message = "Password successfully changed";
      toast.success(message);

      const expiresAtDate = new Date(res.data.tokenExpires);
      Cookies.set("jwt", res.data.token, {expires: expiresAtDate});
    }
  }

  async function handleClickUpdateMe(e) {
    e.preventDefault();
    const userInfo = {id: currentUserId, name, bio};
    const res = await updateMe(userInfo);

    if (res.error) return toast.error("Something went wrong, please check your name and bio!");

    // eslint-disable-next-line no-unused-vars
    const {_id, __v, id, role, active, password, ...updatedUser} = res.data.updatedUser;

    if (res.data.status === "success") {
      dispatch(setCurrentUser(updatedUser));
      toast.success("Account successfully updated");
    }
  }

  async function handleClickUploadPhoto(e) {
    const file = e.target.files[0];

    if (!file) return toast.error("Something went wrong with uploading photo!");

    const formdata = new FormData();
    formdata.append("file", file);

    let res;
    if (file) res = await updateMyPhoto(formdata);

    if (res.data.status === "success") {
      const updatedUser = res.data.user;
      console.log(updatedUser);
      dispatch(setCurrentUser(updatedUser));
      return toast.success("Photo successfully uploaded");
    }
  }

  async function handleClickCloseAccount(e) {
    e.preventDefault();
    setOpenConfirmDelete(!openConfirmDelete);
  }

  if (isDeleting || isUpdating || isUpdatingPassword || isUpdatingPhoto) return <Loader fullscreen={false} />;

  return (
    <Container>
      <GeneralButton type="close" onClick={handleClickClose}>
        <ion-icon name="close-outline" />
      </GeneralButton>
      <Profile>
        <Avatar src={src} alt="User-avatar" />
        <TextDiv>
          <Heading as="h3">{currentUser.name}</Heading>
          <Heading as="h4">{currentUser.bio || "No biography about you..."}</Heading>
        </TextDiv>
        {openConfirmDelete ? (
          <ConfirmDelete deleteAccount={deleteAccount} setOpenConfirmDelete={setOpenConfirmDelete} />
        ) : (
          <ButtonContainer>
            <PhotoButton for="photo">Upload photo</PhotoButton>
            <PhotoInputHidden type="file" accept="image/*" id="photo" name="photo" onChange={handleClickUploadPhoto} />
            <GeneralButton padding="0.5rem 1.5rem" fontSize="1.4rem" type="danger" onClick={handleClickCloseAccount}>
              Close account
            </GeneralButton>
          </ButtonContainer>
        )}
      </Profile>
      <FormContainer>
        <Column>
          <Label>Update password</Label>
          <Input type="password" placeholder="Current Password" required="" minLength="8" maxLength="30" name="password" id="currentPass" />
          <Row>
            <Input type="password" placeholder="New Password" required="" minLength="8" maxLength="30" name="password" id="newPass" />
            <GeneralButton fontSize="1.4rem" type="primary" onClick={handleClickUpdatePassword}>
              Update Change
            </GeneralButton>
          </Row>
        </Column>
        <Column>
          <Label>Update profile</Label>
          <Input value={name} onChange={handleSetNameChange} maxLength="100" />
          <Row>
            <Input placeholder="Your short biography" value={bio} onChange={handleSetBioChange} maxLength="100" />
            <GeneralButton fontSize="1.4rem" type="primary" onClick={handleClickUpdateMe}>
              Update Change
            </GeneralButton>
          </Row>
        </Column>
        <Column>
          <Span>
            {currentData.data === 0 ? `You haven't posted anything yet!` : `You have contributed ${currentData.data} posts to myWebDevHub!`}
          </Span>
        </Column>
      </FormContainer>
    </Container>
  );
}

export default Setting;
