import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  let [document, setDoc] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/doc").then(documents => {
      console.log(documents.data)
      setDoc(documents.data);
    });
  }, [])

  return (
    <>
      <div className="container">
        <Link className="tile" to="/editor">
          <div className="icon">
            <span className="material-symbols-outlined">add</span>
          </div>
        </Link>
        {document?.map((doc,index) => {
          return (
            <div className="tile" key={index}>
              <div className="icon edit">
                <span className="material-symbols-outlined">edit</span>
              </div>
              <div className="content">
                <div className="heading">Title for the document</div>
                <div className="date">Created: 12/04/23</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default Home;
