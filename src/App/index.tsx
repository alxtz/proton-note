import React, { useState } from "react";
import styled from "@emotion/styled";
import { Note } from "./Note";
import DisplayNotePanel from "./DisplayNotePanel";

type NoteIdObject = {
  title: string;
};

type NoteItems = {
  [key: string]: NoteIdObject;
};

function App() {
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);

  // const [noteItems, setNoteItems] = useState([]);
  const [noteItems, setNoteItems] = useState<NoteItems>({
    note_id_0: {
      title: "My first note"
    },
    note_id_1: {
      title: "My second note"
    },
    note_id_2: {
      title: "My third note"
    }
  });

  return (
    <Container>
      <Header>
        <NewNote>+ New Note</NewNote>
      </Header>
      <Main>
        <ChooseNotePanel>
          {Object.entries(noteItems).map(([id, item]) => (
            <Note onClick={() => setCurrentNoteId(id)}>{item.title}</Note>
          ))}
        </ChooseNotePanel>
        {currentNoteId === null || noteItems[currentNoteId] === undefined ? (
          <Empty>no note selected</Empty>
        ) : (
          <DisplayNotePanel title={noteItems[currentNoteId].title} />
        )}
      </Main>
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  border: 4px solid black;
  background: grey;
  padding: 20px;
`;

const NewNote = styled.button``;

const Main = styled.div`
  border: 4px solid brown;
  flex-grow: 1;
  display: flex;
`;

const ChooseNotePanel = styled.div`
  border: 4px solid red;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0px;
`;

const Empty = styled.div`
  border: 4px solid blue;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
