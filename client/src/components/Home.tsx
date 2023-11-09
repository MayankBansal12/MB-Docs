import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DocumentType } from "../types/types";

const Home = () => {
  let [document, setDoc] = useState<DocumentType[]>();

  useEffect(() => {
    axios.get("http://localhost:5000/doc").then(documents => {
      setDoc(documents.data);
      console.log(documents.data);
    });
  }, [])

  return (
    <>
      <div className="container">
        {document?.map((doc, i) => {
          return (
            <Link to={"/documents/" + doc.docId} className="tile" key={i}>
              <div className="icon edit">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div className="content">
                <div className="heading">{doc.title}</div>
                <div className="date">
                  {new Date(doc.updatedAt).toISOString().split('T')[0]}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Link className="circle" to="/editor">
        <div className="icon">
          <span className="material-symbols-outlined">add</span>
        </div>
      </Link>
    </>
  )
}

export default Home;
