/* eslint-disable react/prop-types */
import {Link} from "react-router-dom";
import styled, {css} from "styled-components";

const BackGroundColor = {
  javascript: css`
    background-color: rgb(255, 214, 0, 0.4);
  `,
  html: css`
    background-color: rgb(255, 109, 0, 0.4);
  `,
  css: css`
    background-color: rgb(3, 155, 229, 0.4);
  `,
  sass: css`
    background-color: rgb(240, 98, 146, 0.4);
  `,
  tailwindcss: css`
    background-color: rgb(0, 172, 193, 0.4);
  `,
  react: css`
    background-color: rgb(83, 193, 222, 0.4);
  `,
  redux: css`
    background-color: rgb(108, 78, 176, 0.4);
  `,
  nodejs: css`
    background-color: rgb(33, 163, 102, 0.4);
  `,
  reactrouter: css`
    background-color: rgb(244, 66, 80, 0.4);
  `
};

const CardTop = styled(Link)`
  ${(props) => BackGroundColor[props.category]};
  height: 5%;
`;

export default CardTop;
