import React from "react";
import styled from "@emotion/styled";

type Props = {
  title: string;
};

export default function({ title }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.div`
  border: 4px solid blue;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0px;
`;

const Title = styled.div`
  border: 4px solid black;
  padding: 10px;
  font-weight: bold;
`;
