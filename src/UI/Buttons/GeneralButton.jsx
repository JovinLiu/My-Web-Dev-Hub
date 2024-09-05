import styled, {css} from "styled-components";

const types = {
  close: css`
    height: 25px;
    width: 25px;
    font-size: 25px;
    border-radius: 50%;
    font-size: 2rem;
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    background-color: var(--color-blue-1);
    z-index: 3;
    color: var(--color-grey-50);
    &:hover {
      color: var(--color-grey-700);
      background-color: var(--color-${({category}) => category}-100);
    }
  `,
  general: css`
    padding: 0.5rem 1rem 0.1rem 1rem;
    border-radius: 3px;
    font-size: 2rem;
    background-color: var(--color-${({category}) => category}-20);
    &:hover {
      background-color: var(--color-${({category}) => category}-100);
      color: var(--color-grey-50);
    }
  `
};

const GeneralButton = styled.button`
  ${(props) => types[props.type]};
  border: none;
`;

export default GeneralButton;
