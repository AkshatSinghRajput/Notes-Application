import "./App.css";
import { Navbar } from "./component/Navbar";
import { Home } from "./component/Home";
import { About } from "./component/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Alert from "./component/Alerts";
import { useContext } from "react";
import NoteContext from "./context/notes/NoteContext";
function App() {
  const a = useContext(NoteContext);
  const {alert} = a;
  return (
    <>
        <BrowserRouter>
          <Navbar />
          <Alert alert = {alert}/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
