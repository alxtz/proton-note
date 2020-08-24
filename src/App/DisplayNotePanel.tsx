import React from "react";
import styled from "@emotion/styled";
import marked from "marked";

type Mode = "view" | "edit";

type Props = {
  title: string;
  markdownSource: string;
  mode: Mode;
  cachedMdSource: string;
  setCachedMdSource: (value: string) => void;
  cachedTitle: string;
  setCachedTitle: (value: string) => void;
  onDelete: () => void;
  onSave: () => void;
  onClickEdit: () => void;
  onClickView: () => void;
};

export default function({
  title,
  markdownSource,
  mode,
  cachedMdSource,
  setCachedMdSource,
  cachedTitle,
  setCachedTitle,
  onSave,
  onDelete,
  onClickEdit,
  onClickView
}: Props) {
  const htmlStringFromMd = marked(markdownSource);

  return (
    <Container>
      <Title>
        {mode === "edit" ? (
          <TitleInput
            value={cachedTitle}
            onChange={e => setCachedTitle(e.target.value)}
          />
        ) : (
          title
        )}
      </Title>
      <Render>
        {mode === "edit" ? (
          <EditTextarea
            value={cachedMdSource}
            onChange={e => setCachedMdSource(e.target.value)}
          />
        ) : (
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: htmlStringFromMd }}
          />
        )}
      </Render>
      <BottomBar>
        {mode === "edit" ? (
          <>
            <ViewButton onClick={onClickView}>Cancel</ViewButton>
            <ViewButton onClick={onSave}>Save</ViewButton>
            <ViewButton onClick={onDelete}>Delete</ViewButton>
          </>
        ) : (
          <EditButton onClick={onClickEdit}>Edit</EditButton>
        )}
      </BottomBar>
    </Container>
  );
}

const Container = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  border: 4px solid black;
  padding: 10px;
  font-weight: bold;
`;

const TitleInput = styled.input``;

const Render = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 10px;
`;

const EditTextarea = styled.textarea`
  display: block;
  flex-grow: 1;
  font-size: 18px;
`;

const BottomBar = styled.div`
  border: 4px solid black;
  padding: 10px;
  font-weight: bold;
`;

const EditButton = styled.button``;

const ViewButton = styled.button``;
