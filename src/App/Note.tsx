import styled from "@emotion/styled";

export const Note = styled.div`
  border: 4px solid black;
  flex-grow: 1;
  display: flex;
  padding: 10px;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 0;
  }

  &:hover {
    background: cyan;
  }
`;
