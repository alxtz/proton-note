import styled from "@emotion/styled";

export const Note = styled.div<{ disabled: boolean }>`
  border: 4px solid black;
  border-left: 0;
  border-right: 0;
  flex-grow: 1;
  display: flex;
  padding: 10px;
  cursor: pointer;

  &:first-child {
    border-top: 0;
  }

  &:not(:last-child) {
    border-bottom: 0;
  }

  &:hover {
    background: cyan;
  }

  ${props =>
    props.disabled &&
    `
    opacity: 0.2;
    pointer-events: none;
    background: white !important;
    cursor: default;
  `}
`;
