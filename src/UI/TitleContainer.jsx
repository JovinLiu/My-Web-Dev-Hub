/* eslint-disable react/prop-types */
import styled from "styled-components";

const TitleContainer = styled.div`
  color: var(--color-grey-600);
  background-color: var(${({category}) => (category ? `--color-${category}-20` : "--color-blue-3")});
  height: ${(props) => props.height};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  gap: ${(props) => props.gap};
  align-items: ${(props) => props.alignItems};
  justify-content: start;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  z-index: 1;
  position: ${(props) => props.position};
  overflow: hidden;
`;

export default TitleContainer;
