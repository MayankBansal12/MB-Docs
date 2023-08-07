import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TextEditor from "./TextEditor";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/editor" Component={TextEditor} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
