import { useState } from "react";
import { Link } from "react-router-dom";
import { DocumentType } from "../types/types";
import makeRequest from "../utils/api";
import { notify } from "../utils/notification";

type tileProps = {
    doc: DocumentType
}

const DocTile = ({ doc }: tileProps) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    // Delete the selected doc
    const deleteDoc = async () => {
        const res = await makeRequest("DELETE", "/doc/" + doc.docId, doc)
        if (res.status === 200) {
            notify("Doc deleted successfully!", "success")
            window.location.reload();
        } else {
            notify("Error while deleting, try again!", "error");
        }
    }

    return (
        <Link to={"/documents/" + doc.docId} className="tile">
            <div className="icon edit">
                <span className="material-symbols-outlined">description</span>
            </div>
            <div className="content">
                <div className="doc-content">
                    <div className="heading">{doc.title}</div>
                    <div className="date">
                        Last Opened: {new Date(doc.updatedAt).toISOString().split('T')[0]}
                    </div>
                </div>
                <button className="material-symbols-outlined doc-menu-btn" onClick={(e) => {
                    e.preventDefault();
                    setShowPopup(!showPopup);
                }}>more_vert</button>
                {showPopup && <div className="popup doc-popup" onClick={(e) => e.preventDefault()}>
                    <div className="popup-home">
                        <span className="popup-item">More Info</span>
                        <span className="popup-item" onClick={() => setShowDelete(!showDelete)}>Delete</span>
                        {showDelete && <div className="confirm-popup">
                            <span className="material-symbols-outlined confirm-false" onClick={() => setShowDelete(false)}>
                                close</span>
                            <span className="material-symbols-outlined confirm-true" onClick={deleteDoc}>
                                check
                            </span>
                        </div>}
                    </div>
                </div>}
            </div>
        </Link>
    )
}

export default DocTile
