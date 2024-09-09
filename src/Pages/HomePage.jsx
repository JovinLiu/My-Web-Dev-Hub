import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  font-size: 20rem;
`;

function HomePage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/app");
  }

  return (
    <Div>
      Home Page
      <br />
      <button onClick={handleClick}>App</button>
    </Div>
  );
}

export default HomePage;
