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
      color: var(--color-grey-700);
      background-color: var(--color-${({category}) => (category ? `${category}-100` : "blue-2")});
    }
  `,
  primary: css`
    padding: ${({padding}) => padding || "0.5rem 1rem 0.3rem 1rem"};
    border-radius: 10px;
    font-size: ${({fontSize}) => fontSize || "2rem"};
    color: var(
      ${({category, active}) => (category ? (active ? "--color-grey-50" : "--color-grey-800") : active ? "--color-grey-800" : "--color-grey-50")}
    );
    background-color: var(
      ${({category, active}) =>
        category ? (active ? `--color-${category}-100` : `--color-${category}-20`) : active ? `--color-${category}-20` : "--color-blue-1"}
    );
    &:hover {
      color: var(${({category}) => (category ? "--color-grey-50" : "--color-grey-800")});
      background-color: var(${({category}) => (category ? `--color-${category}-100` : "--color-blue-2")});
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
  `,
  secondary: css`
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-size: 1.5rem;
    color: var(--color-grey-50);
    background-color: var(--color-blue-1);
    &:hover {
      color: var(--color-grey-700);
      background-color: var(--color-blue-2);
    }
  `,
  danger: css`
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-size: 1.5rem;
    color: var(--color-grey-50);
    background-color: var(--color-red-700);
    &:hover {
      color: var(--color-grey-700);
      background-color: var(--color-red-100);
    }
  `
};

const GeneralButton = styled.button`
  ${(props) => types[props.type]};
  border: none;
  transition: var(--transition-1);
`;

export default GeneralButton;
