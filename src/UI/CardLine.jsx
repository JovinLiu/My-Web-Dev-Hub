/* eslint-disable react/prop-types */
import styled from "styled-components";

const CardLine = styled.div`
  background-color: var(${({category}) => (category ? `--color-${category}-20` : "--color-blue-3")});
  height: ${({height}) => height};
  margin: ${({margin}) => margin};
`;

export default CardLine;
