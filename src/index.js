import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NoteState from './context/notes/NoteState';
ReactDOM.render(
  <React.StrictMode>
    <NoteState>
    <App />
    </NoteState>
  </React.StrictMode>,
  document.getElementById('root')
);
