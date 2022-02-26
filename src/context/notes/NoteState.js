import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  let host = "http://localhost:5000";
  let notesInitial = [];
  let [alert, setAlert] = useState(null);
  
  const [notes, setNotes] = useState(notesInitial);
  // Set the Alert
  let showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  // Get all Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log("Adding a new note");
    console.log(json);
  };
  // Update a note
  const updateNote = async (id, title, description, tag) => {
    // Using the Fetch Api
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ id, title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    // Editing the note
    let tempNote = JSON.parse(JSON.stringify(notes));
    tempNote.forEach((note) => {
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
      setNotes(tempNote);
    });
  };
  // Delete a note
  const deleteNote = async (id) => {
    // Api Calls
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(id, json);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, getNotes,showAlert, alert }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
