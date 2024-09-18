//http://localhost:3000/resetPassword/873dd264f00aa7b663491af0908df67ac8031f6378deb1a5db89884da5248b8a
import {Link, Outlet} from "react-router-dom";
//Components
import Header from "../UI/Header";
import styled from "styled-components";
import Main from "../UI/Main";

const Section = styled.section`
  height: ${({height}) => height};
  border-bottom: 0.5px solid var(--color-grey-500);
  margin: 0;
  overflow: hidden;
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

const FootText = styled.span`
  margin-left: auto;
`;

const LinkOutside = styled(Link)`
  height: 1.25rem;
  width: 1.25rem;
  scale: 2;
  display: flex;
  align-items: center;
`;

function PasswordReset() {
  return (
    <>
      <Header showLogoOnly={true} />
      <Section height="calc(100vh - 10rem)">
        <Main>
          <Outlet />
        </Main>
      </Section>
      <Footer>
        <FooterContainer>
          <FootText>Design and Coded by Jovin Liu</FootText>
          <LinkOutside to="https://github.com/JovinLiu">
            <ion-icon name="logo-github" />
          </LinkOutside>
          <LinkOutside to="https://www.linkedin.com/in/jovin-liu-b173b0128/">
            <ion-icon name="logo-linkedin" />
          </LinkOutside>
        </FooterContainer>
      </Footer>
    </>
  );
}

export default PasswordReset;
