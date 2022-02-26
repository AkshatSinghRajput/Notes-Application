import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
export const Notes = () => {
  const a = useContext(NoteContext);
  const [note, setNotes] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  const { notes, getNotes, updateNote,showAlert } = a;
  let ref = useRef(null);
  let refClose = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    // eslint-disable-next-line
    let isApiSubscribed = true;
    if(localStorage.getItem('token')){
      if(isApiSubscribed){
        getNotes();
      } 
    }
    else{
      navigate("/login");
    }
    return ()=>{
       isApiSubscribed = false;
    }
    
  }, [notes]);
  const update = (currentNote) => {
    ref.current.click();
    setNotes({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    
  };
  const handleClick = (e) => {
    e.preventDefault();
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Successfully Updated the note","success");
  };
  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
        hidden={true}
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length > 5 && note.edescription.length > 5
                    ? false
                    : true
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.length === 0 && (
          <div className="container">
            <h2>Your notes are visible here......</h2>
          </div>
        )}
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} update={update}></NoteItem>;
        })}
      </div>
    </>
  );
};
