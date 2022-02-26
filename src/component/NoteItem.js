import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const { note ,update } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-between">
          <i className="fa-regular fa-trash-can" onClick={()=>{
            deleteNote(note._id);
          }}></i>
          <i className="fa-regular fa-pen-to-square" onClick={()=>{
            update(note)
          }}></i>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default NoteItem;
