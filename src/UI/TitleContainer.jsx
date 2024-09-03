/* eslint-disable react/prop-types */
import {Link} from "react-router-dom";
import styled, {css} from "styled-components";

const textBackGround = {
  javascript: css`
    background-color: rgb(255, 214, 0, 0.3);
  `,
  html: css`
    background-color: rgb(255, 109, 0, 0.3);
  `,
  css: css`
    background-color: rgb(3, 155, 229, 0.3);
  `,
  sass: css`
    background-color: rgb(240, 98, 146, 0.3);
  `,
  tailwindcss: css`
    background-color: rgb(0, 172, 193, 0.3);
  `,
  react: css`
    background-color: rgb(83, 193, 222, 0.3);
  `,
  redux: css`
    background-color: rgb(108, 78, 176, 0.3);
  `,
  nodejs: css`
    background-color: rgb(33, 163, 102, 0.3);
  `,
  reactrouter: css`
    background-color: rgb(244, 66, 80, 0.3);
  `
};

const TitleContainer = styled(Link)`
  ${(props) => textBackGround[props.category]};
  height: 30%;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: start;
  padding: 1.4rem;
  z-index: 1;
`;

export default TitleContainer;
