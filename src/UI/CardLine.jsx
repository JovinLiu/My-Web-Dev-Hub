/* eslint-disable react/prop-types */
import styled from "styled-components";

const CardLine = styled.div`
  background-color: var(--color-${({category}) => category}-20);
  height: ${({height}) => height};
`;

export default CardLine;
