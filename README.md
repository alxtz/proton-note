# Tooling

1. CRA + TS template for basic dev-server setup
2. emotion for styling
3. marked for transpiling raw markdown source to html elements
4. uuid for generating an arbitrary id for new note items
5. deployed onto GitHub pages https://alxtz.github.io/proton-note/

# Test cases

- [x] **View mode**
      ![](https://i.imgur.com/PYwFJ5Z.png)

The user can:

- [x] view a list of notes (left pane).
- [x] view the title and markdown rendered text of a note (right pane - **view mode**).
- [x] write a title and plaintext markdown text and save it as a note (right pane - **edit mode**).

The user can:

- [x] open an existing note and view the markdown rendered note (the composer is not visible).
- [x] click on the `Edit` button to be taken to the edit mode.
- [x] click on the `New note` button to be taken to the edit mode and create a new note in the list of notes.

---

- [x] **Edit mode**
      Edit mode is activated either by creating a new note or editing an existing one.
      ![](https://i.imgur.com/ZLfuPzL.png)

The user can:

- [x] not click on the `New note` button.
- [x] not click on another note.
- [x] click on the `Cancel` button to be taken to the view mode.
- [x] click on the `Delete` button to delete the note.
- [x] click on the `Save` button to save the note and be taken to the view mode.

---

### Data

- [x] The title of each note is not encrypted (stored in clear text).
- [x] The content of each note is encrypted when saving it. Take into consideration the loading state.
- [x] The content of each note is decrypted when opening it. Take into consideration the loading state.
- [x] Since real encryption/decryption are out of scope, mock the encrypt and decrypt operations with the following functions that do not alter any data.

```
const wait = async (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 500);
    });
};

const encrypt = async (data) => {
    await wait(500);
    return data;
}

const decrypt = async (data) => {
    await wait(500);
    return data;
}
```
