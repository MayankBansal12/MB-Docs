import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DocumentType, UserType } from "../types/types";
import Header from "./Header";
import DocTile from "./DocTile";
import makeRequest from "../utils/api";
import { notify } from "../utils/notification";
import { useRecoilState } from "recoil";
import { popupAtom } from "../atom/popup";

const Home = () => {
  let [document, setDoc] = useState<DocumentType[]>();
  const [user, setUser] = useState<UserType>();
  const navigate = useNavigate();
  const [popup, setPopup] = useRecoilState(popupAtom)

  // Fetch all the docs for that user
  const fetchData = async () => {
    const res = await makeRequest("GET", "/doc");
    setDoc(res?.data?.documents);
  }

  // Fetch User details
  const fetchUser = async () => {
    const res = await makeRequest("GET", "/user");
    setUser(res?.data?.user);
  }

  // Delete the selected doc
  const deleteDoc = async (doc: DocumentType) => {
    const res = await makeRequest("DELETE", "/doc/" + doc.docId, doc)
    if (res.status === 200) {
      setDoc((prevDoc) => prevDoc?.filter(d => d.docId !== doc.docId));
      setPopup({ show: false });
      notify("Doc deleted successfully!", "success")
    } else {
      notify("Error while deleting, try again!", "error");
    }
  }

  // check for user token and fetch details
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUser();
      fetchData();
    }
  }, [])

  const reverseOrder = () => {
    setDoc(prevDoc => {
      if (prevDoc && prevDoc.length > 0) {
        let docs = [...prevDoc]?.reverse();
        return docs;
      }
    });
  }

  return (
    <>
      <Header page="home" user={user} />
      <div className="home-header">
        <h3>Recent Documents</h3>
        <button className="material-symbols-outlined" onClick={reverseOrder}>
          sort
        </button>
      </div>
      <div className="container">
        {popup.show && <div className="popup-overlay" onClick={() => setPopup({ show: false })}></div>}
        {document && document.length > 0 ? document?.map((doc, i) => {
          return (
            <DocTile doc={doc} key={i} onDelete={deleteDoc} />
          );
        })
          :
          <div className="data-info">No Documents to show...Create new document and write your ideas, thoughts and collaborate with your friends...Start now by clicking on the button below </div>
        }
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
