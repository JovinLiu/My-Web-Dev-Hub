import styled from "styled-components";
import LogoSvg from "./LogoSvg";

const LogoContainer = styled.div`
  margin-top: 0.5rem;
  margin-left: 6.5rem;
  display: flex;
  flex-direction: column;
  text-decoration: none;
`;

const LogoInfoContainer = styled.h1`
  font-size: 2rem;
  display: flex;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-style: normal;
`;

const LogoText = styled.span`
  font-size: 3rem;
  display: inline;
`;

const LogoText1 = styled.span`
  color: var(--color-grey-400);
  margin-left: 1rem;
  margin-top: 1rem;
`;

const LogoText2 = styled(LogoText)`
  color: white;
`;

const LogoText3 = styled(LogoText)`
  border-radius: 8px;
  color: white;
`;

function Logo() {
  return (
    <LogoContainer>
      <LogoInfoContainer>
        <LogoSvg />
        <LogoText1>My </LogoText1>
        <LogoText2>WebDev </LogoText2>
        <LogoText3>
          <strong>Hub</strong>
        </LogoText3>
      </LogoInfoContainer>
    </LogoContainer>
  );
}

export default Logo;
