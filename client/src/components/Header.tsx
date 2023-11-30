import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import makeRequest from "../utils/api";
import { UserType } from "../types/types";

type HeaderProps = {
  page: string
  user?: UserType
}

const Header = ({ page, user }: HeaderProps) => {
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("New Document");
  const { id: documentId } = useParams();

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

  const saveTitle = async () => {
    setEditTitle(false);
    await makeRequest("PUT", `/doc/${documentId}`, { title })
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
        <button className="btn-dark">Share</button>
      </>}

      {/* Profile Option */}
      {page === "home" && <>
        <button className="header-profile">
          <p>{user?.name}</p>
          <span className="material-symbols-outlined">
            account_circle
          </span>
        </button>
      </>}
    </nav>
  )
}

export default Header
