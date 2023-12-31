import Home from "./Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Editor from "./Editor";
import Login from "./Login";
import Signup from "./Signup";
import ResetPass from "./ResetPass";
import EditProfile from "./EditProfile";
import { v4 as uuidv4 } from 'uuid';
import ForgotPass from "./ForgotPass";
import { useEffect } from "react";
import 'noty/lib/noty.css';
import "noty/lib/themes/semanticui.css";
import axios from "axios";
const backend = import.meta.env.VITE_SERVER;

const App = () => {

  // Cold start for the server
  useEffect(() => {
    axios.get(backend + "/")
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/forgotpass" Component={ForgotPass} />
        <Route path="/resetpass" Component={ResetPass} />
        <Route path="/editor" Component={EditorRedirect} />
        <Route path="/documents/:id" Component={Editor} />
        <Route path="/edit-profile" Component={EditProfile} />
      </Routes>
    </BrowserRouter>
  )
}

// Component to handle the /editor route and generate UUID-based dynamic route
const EditorRedirect = () => {
  return <Navigate to={`/documents/${uuidv4()}`} />;
};

export default App;
