import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {toggleDarkMode} from "../../Pages/uiSlice";
import {useEffect} from "react";

const Container = styled.div`
  color: var(--color-grey-400);
  font-size: 2rem;
  margin-right: 1rem;
`;

const Button = styled.button`
  color: var(--color-grey-50);
  padding: 0.5rem;
  background-color: var(--color-blue-1);
  border: none;
  border-radius: 10px;
  transition: all, 0.2s;
  width: 3.5rem;
  height: 3.5rem;

  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
`;

function DarkModeButton() {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const dispatch = useDispatch();

  useEffect(
    function () {
      const currentHour = new Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        hour12: false
      }).format(new Date());

      const isNight = (currentHour >= 18 && currentHour <= 24) || (currentHour >= 0 && currentHour <= 6);
      if (isNight) {
        dispatch(toggleDarkMode(true));
      } else {
        dispatch(toggleDarkMode(false));
      }
    },
    [dispatch]
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  function handleClickDarkMode() {
    dispatch(toggleDarkMode(!isDarkMode));
  }

  return (
    <Container>
      <Button onClick={handleClickDarkMode}>
        <ion-icon name={`${isDarkMode ? "sunny" : "moon"}-outline`} />
      </Button>
    </Container>
  );
}

export default DarkModeButton;
