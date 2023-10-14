import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import TextEditor from "./TextEditor";
import Login from "./Login";
import Signup from "./Signup";
import ResetPass from "./ResetPass";
const { v4: uuidv4 } = require('uuid');

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={Login}></Route>
        <Route exact path="/signup" Component={Signup}></Route>
        <Route exact path="/forgotpass" Component={ResetPass}></Route>
        <Route exact path="/editor" element={<EditorRedirect />} />
        <Route path="/documents/:id" Component={TextEditor} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

// Component to handle the /editor route and generate UUID-based dynamic route
const EditorRedirect = () => {
  return <Navigate to={`/documents/${uuidv4()}`} />;
};

export default App;
