import {useNavigate} from "react-router-dom";
import styled from "styled-components";
//Components
import Header from "../UI/Header";

const Section = styled.section`
  height: ${({height}) => height};
  border-bottom: 0.5px solid var(--color-grey-500);
  margin: 0;
  overflow: hidden;
  text-align: center;
`;

const Footer = styled.footer`
  height: 3.9rem;
  background-color: var(--color-grey-50);
  overflow: hidden;
`;

const FooterContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;
  font-size: 1.25rem;
  margin-right: 3rem;
  color: var(--color-blue-1);
`;

const Div = styled.div`
  margin-top: calc(50vh - 6rem);
  transform: translateY(-80%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Span = styled.span`
  font-size: 5rem;
`;

const Button = styled.span`
  cursor: pointer;
  padding: 1rem 3rem;
  height: 5rem;
  width: 30rem;
  border-radius: 50px;
  font-size: 2rem;
  color: var(--color-grey-50);
  background-color: var(--color-blue-1);
  border: none;
  font-weight: bold;
  transition: var(--transition-1);
  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-blue-2);
  }
`;

function PageNotFound() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <>
      <Header showLogoOnly={true} />
      <Section height="calc(100vh - 10rem)">
        <Div>
          <Span>Page Not Found</Span>

          <Button onClick={handleClick}>Return to Home Page</Button>
        </Div>
      </Section>
      <Footer>
        <FooterContainer></FooterContainer>
      </Footer>
    </>
  );
}

export default PageNotFound;
