/* eslint-disable react/prop-types */
import styled, {css} from "styled-components";

const textBackGround = {
  javascript: css`
    background-color: rgb(255, 214, 0, 0.2);
  `,
  html: css`
    background-color: rgb(255, 109, 0, 0.2);
  `,
  css: css`
    background-color: rgb(3, 155, 229, 0.2);
  `,
  sass: css`
    background-color: rgb(240, 98, 146, 0.2);
  `,
  tailwindcss: css`
    background-color: rgb(0, 172, 193, 0.2);
  `,
  react: css`
    background-color: rgb(83, 193, 222, 0.2);
  `,
  redux: css`
    background-color: rgb(108, 78, 176, 0.2);
  `,
  nodejs: css`
    background-color: rgb(33, 163, 102, 0.2);
  `,
  reactrouter: css`
    background-color: rgb(244, 66, 80, 0.2);
  `
};

const TitleContainer = styled.div`
  ${(props) => textBackGround[props.category]};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  gap: ${(props) => props.gap};
  align-items: ${(props) => props.alignItems};
  justify-content: start;
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  z-index: 1;
`;

export default TitleContainer;
