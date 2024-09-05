/* eslint-disable react/prop-types */
import styled from "styled-components";

const TitleContainer = styled.div`
  color: var(--color-grey-600);
  background-color: var(--color-${({category}) => category}-20);
  height: ${(props) => props.height};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  gap: ${(props) => props.gap};
  align-items: ${(props) => props.alignItems};
  justify-content: start;
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  z-index: 1;
  position: relative;
  overflow: hidden;
`;

export default TitleContainer;
