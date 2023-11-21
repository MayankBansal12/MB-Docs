import Home from "./Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Editor from "./Editor";
import Login from "./Login";
import Signup from "./Signup";
import ResetPass from "./ResetPass";

import { v4 as uuidv4 } from 'uuid';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login}></Route>
        <Route path="/signup" Component={Signup}></Route>
        <Route path="/forgotpass" Component={ResetPass}></Route>
        <Route path="/editor" Component={EditorRedirect} />
        <Route path="/documents/:id" Component={Editor} />
      </Routes>
    </BrowserRouter>
  )
}

// Component to handle the /editor route and generate UUID-based dynamic route
const EditorRedirect = () => {
  return <Navigate to={`/documents/${uuidv4()}`} />;
};

export default App;
