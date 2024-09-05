import styled, {css} from "styled-components";

const types = {
  close: css`
    height: 2.5rem;
    width: 2.5rem;
    font-size: 2rem;
    border-radius: 50%;
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    background-color: var(--color-blue-1);
    z-index: 3;
    color: var(--color-grey-50);
    &:hover {
      background-color: var(--color-${({category}) => category}-100);
    }
  `,
  primary: css`
    padding: 0.5rem 1rem 0.1rem 1rem;
    border-radius: 3px;
    font-size: 2rem;
    color: ${({color}) => color};
    background-color: var(${({category}) => (category ? `--color-${category}-20` : "--color-blue-1")});
    &:hover {
      background-color: var(${({category}) => (category ? `--color-${category}-100` : "--color-blue-2")});
      color: var(--color-grey-50);
    }
  `,
  userRound: css`
    height: 3.5rem;
    width: 3.5rem;
    font-size: 2rem;
    border-radius: 50%;
    color: var(--color-grey-400);
    border: none;
    outline: 2px solid var(--color-grey-200);
    background-color: var(--color-grey-50);
    &:hover {
      color: var(--color-grey-700);
      background-color: var(--color-blue-2);
    }
  `
};

const GeneralButton = styled.button`
  ${(props) => types[props.type]};
  border: none;
  transition: var(--transition-1);
`;

export default GeneralButton;
