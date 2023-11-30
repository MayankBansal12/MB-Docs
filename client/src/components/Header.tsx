import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import makeRequest from "../utils/api";

type HeaderProps = {
  page: string
}

const Header = ({ page }: HeaderProps) => {
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("");
  const { id: documentId } = useParams();

  const getTitle = async () => {
    const res = await makeRequest("GET", `/doc/${documentId}`);
    setTitle(res.data?.document?.title);
  }

  useEffect(() => {
    if (page === "editor") {
      getTitle();
    }
  }, [])

  const saveTitle = async () => {
    setEditTitle(false);
    await makeRequest("PUT", `/doc/${documentId}`, { title })
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
        <div>
          <input placeholder="Title for the Document" value={title} disabled={!editTitle} onChange={(e) => setTitle(e.target.value)} />

          <button>
            {!editTitle ? <span className="material-symbols-outlined" onClick={() => setEditTitle(!editTitle)}>
              edit
            </span> : <span className="material-symbols-outlined" onClick={saveTitle}>
              save
            </span>}
          </button>
        </div>
        <button className="btn">Share</button>
      </>}

      {/* Profile Option */}
      {page === "home" && <>
        <div>
          <p>User</p>
          <button>
            <span className="material-symbols-outlined">
              account_circle
            </span>
          </button>
        </div>
      </>}
    </nav>
  )
}

export default Header
