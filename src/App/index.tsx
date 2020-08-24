import React, { useState } from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import { Note } from "./Note";
import DisplayNotePanel from "./DisplayNotePanel";
import defaultNotes from "./defaultNotes.json";
import { encrypt, decrypt } from "./utils";
import loadingSvg from "./loading.svg";

type NoteIdObject = {
  title: string;
  markdownSource: string;
};

type NoteItems = {
  [key: string]: NoteIdObject;
};

function App() {
  const [mode, setMode] = useState<"edit" | "view">("view");
  const [loading, setLoading] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const [cachedMdSource, setCachedMdSource] = useState("");
  const [cachedTitle, setCachedTitle] = useState("");
  const [noteItems, setNoteItems] = useState<NoteItems>(defaultNotes);
  const [decryptedMd, setDecryptedMd] = useState("");

  const createNewNote = () => {
    const newNoteId = uuidv4();
    const newNoteItems = {
      ...noteItems,
      [newNoteId]: {
        title: "New untitled note",
        markdownSource: ""
      }
    };

    setCurrentNoteId(newNoteId);
    setNoteItems(newNoteItems);
    editNoteById(newNoteId, newNoteItems);
  };

  const deleteNote = (noteId: string) => {
    setCurrentNoteId(null);
    setMode("view");

    const newNoteItems = {
      ...noteItems
    };

    delete newNoteItems[noteId];

    setNoteItems(newNoteItems);
  };

  const saveById = (noteId: string, mdValue: string, titleValue: string) => {
    setLoading(true);
    encrypt(mdValue).then(encrypted => {
      const newNoteItems = {
        ...noteItems
      };

      newNoteItems[noteId].markdownSource = encrypted;
      newNoteItems[noteId].title = titleValue;

      setNoteItems(newNoteItems);
      setMode("view");
      setLoading(false);

      // show the edited md value back
      setDecryptedMd(mdValue);
    });
  };

  const editNoteById = (noteId: string, stateNotes: NoteItems) => {
    setCachedMdSource(stateNotes[noteId].markdownSource);
    setCachedTitle(stateNotes[noteId].title);
    setMode("edit");
  };

  const chooseNote = (noteId: string) => {
    setLoading(true);
    setCurrentNoteId(noteId);
    decrypt(noteItems[noteId].markdownSource).then(decrypted => {
      setLoading(false);
      setDecryptedMd(decrypted);
    });
  };

  let contentToRender;

  if (currentNoteId === null || noteItems[currentNoteId] === undefined) {
    contentToRender = <Empty>no note selected</Empty>;
  } else if (loading) {
    contentToRender = (
      <Loading>
        <img src={loadingSvg} />
      </Loading>
    );
  } else {
    contentToRender = (
      <DisplayNotePanel
        markdownSource={decryptedMd}
        title={noteItems[currentNoteId].title}
        mode={mode}
        cachedMdSource={cachedMdSource}
        setCachedMdSource={setCachedMdSource}
        cachedTitle={cachedTitle}
        setCachedTitle={setCachedTitle}
        onSave={() => {
          saveById(currentNoteId, cachedMdSource, cachedTitle);
        }}
        onDelete={() => deleteNote(currentNoteId)}
        onClickView={() => {
          setMode("view");
          chooseNote(currentNoteId);
        }}
        onClickEdit={() => editNoteById(currentNoteId, noteItems)}
      />
    );
  }

  return (
    <Container>
      <Header>
        <NewNote disabled={mode === "edit"} onClick={() => createNewNote()}>
          + New Note
        </NewNote>
      </Header>
      <Main>
        <ChooseNotePanel>
          {Object.entries(noteItems).map(([id, item]) => (
            <Note
              key={id}
              onClick={() => chooseNote(id)}
              disabled={mode === "edit"}
            >
              {item.title}
            </Note>
          ))}
        </ChooseNotePanel>
        {contentToRender}
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
  flex-grow: 1;
  display: flex;
`;

const ChooseNotePanel = styled.div`
  border: 4px solid black;
  border-top: 0;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0px;
`;

const Empty = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0px;
  display: flex;
  flex-direction: column;
  background: rgba(200, 200, 200);

  align-items: center;
  justify-content: center;
`;
