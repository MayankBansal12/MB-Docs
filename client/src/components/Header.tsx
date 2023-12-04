import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Noty from "noty";
import makeRequest from "../utils/api";
import { UserType } from "../types/types";
import Popup from "./Popup";

type HeaderProps = {
  page: string
  user?: UserType
}

const Header = ({ page, user }: HeaderProps) => {
  const [editTitle, setEditTitle] = useState(false);
  const [showPopup, setShowPopup] = useState(false)
  const [title, setTitle] = useState("New Document");
  const { id: documentId } = useParams();

  // Noty js notification
  const successNoty = new Noty({
    text: "Title Updated!",
    type: "success",
    theme: "semanticui",
    timeout: 1500,
  });
  const errorNoty = new Noty({
    text: "Error while updating, try again!",
    type: "error",
    theme: "semanticui",
    timeout: 1500,
  });

  // For toggling popup in case of header
  const togglePopup = () => {
    setShowPopup(!showPopup);
  }

  // To fetch title in case of editor page
  const getTitle = async () => {
    const res = await makeRequest("GET", `/doc/${documentId}`);
    setTitle(res.data?.document?.title);
  }

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
      successNoty.show();
    } else {
      errorNoty.show();
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
        <button className="btn-dark" onClick={togglePopup}>Share</button>

      </>}

      {/* Profile Option */}
      {page === "home" && <>
        <button className="header-profile" onClick={togglePopup}>
          <p>{user?.name}</p>
          <span className="material-symbols-outlined">
            account_circle
          </span>
        </button>
      </>}

      {showPopup && <Popup page={page} />}
    </nav>
  )
}

export default Header
