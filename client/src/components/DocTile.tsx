import { useState } from "react";
import { Link } from "react-router-dom";
import { DocumentType } from "../types/types";
import makeRequest from "../utils/api";
import Noty from "noty";

type tileProps = {
    doc: DocumentType
}

const DocTile = ({ doc }: tileProps) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const successNoty = new Noty({
        text: "Doc deleted successfully!",
        type: "success",
        theme: "semanticui",
        timeout: 3000,
    });
    const errorNoty = new Noty({
        text: "Error while deleting, try again!",
        type: "error",
        theme: "semanticui",
        timeout: 3000,
    });

    const deleteDoc = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const res = await makeRequest("DELETE", "/doc/" + doc.docId, doc)
        if (res.status === 200) {
            successNoty.show();
            window.location.reload();
        } else {
            errorNoty.show();
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
                {showPopup && <div className="popup doc-popup">
                    <div className="popup-home">
                        <span className="popup-item" onClick={(e) => e.preventDefault()}>More Info</span>
                        <span className="popup-item" onClick={(e) => {
                            e.preventDefault();
                            setShowDelete(!showDelete)
                        }}>Delete</span>
                        {showDelete && <div className="confirm-popup">
                            <span className="material-symbols-outlined confirm-false" onClick={(e) => {
                                e.preventDefault();
                                setShowDelete(false)
                            }}>
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
