import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserType } from "../types/types";
import Popup from "./Popup";
import { notify } from "../utils/notification";
import { popupAtom } from "../atom/popup";
import { useRecoilState } from "recoil";
import useApi from "../hooks/useApi";

type HeaderProps = {
  page: string
  user?: UserType
}

const Header = ({ page, user }: HeaderProps) => {
  const [editTitle, setEditTitle] = useState(false);
  const [showPopup, setShowPopup] = useState(false)
  const [popup, setPopup] = useRecoilState(popupAtom)
  const [title, setTitle] = useState("New Document");
  const { id: documentId } = useParams();
  const { makeRequest } = useApi();

  // To fetch title in case of editor page
  const getTitle = async () => {
    const res = await makeRequest("GET", `/doc/${documentId}`);
    setTitle(res.data?.document?.title);
  }

  const handlePopup = () => {
    setPopup({ show: true });
    setShowPopup(true);
  }

  useEffect(() => {
    if (popup.show === false && showPopup) {
      setShowPopup(false);
    }
  }, [popup.show])

  // If current page is editor then fetch title for doc
  useEffect(() => {
    if (page === "editor") {
      getTitle();
    }
  }, []);

  // Save title in case user updates
  const saveTitle = async () => {
    setEditTitle(false);
    const res = await makeRequest("PUT", `/doc/${documentId}`, { title })
    if (res.status === 200) {
      notify("Title Updated!", "success", 1500);
    } else {
      notify("Error while updating, try again!", "error", 1500);
    }
    if (title === "")
      setTitle("New Document");
  }

  return (
    <nav className="header">
      {/* Logo */}
      <Link to="/" className="logo">
        <span className="material-symbols-outlined">
          article
        </span>
        <span>
          MB DOCS
        </span>
      </Link>

      {/* Input Title */}
      {page === "editor" && <>
        <div className="header-title">
          <input placeholder="Title for the Document" value={title === " " ? "New Document" : title} className="input-title" disabled={!editTitle} onChange={(e) => setTitle(e.target.value)} />
          <button className="title-btn">
            {!editTitle ? <span className="material-symbols-outlined" onClick={() => setEditTitle(!editTitle)}>
              edit
            </span> : <span className="material-symbols-outlined" onClick={saveTitle}>
              save
            </span>}
          </button>
        </div>
        <button className="btn-dark share-btn" onClick={handlePopup}>Share</button>
      </>}

      {/* Profile Option */}
      {page === "home" && <>
        <button className="header-profile" onClick={handlePopup}>
          <p>{user?.name}</p>
          <span className="material-symbols-outlined">
            account_circle
          </span>
        </button>
      </>}

      {popup.show && showPopup && <Popup page={page} />}
    </nav>
  )
}

export default Header
