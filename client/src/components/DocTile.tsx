import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DocumentType } from "../types/types";
import { useRecoilState } from "recoil";
import { popupAtom } from "../atom/popup";

type tileProps = {
    doc: DocumentType,
    onDelete: Function
}

const DocTile = ({ doc, onDelete }: tileProps) => {
    const [popup, setPopup] = useRecoilState(popupAtom);
    const [showPopup, setShowPopup] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        if (popup.show === false && showPopup) {
            setShowPopup(false);
            setShowDelete(false);
        }
    }, [popup.show])

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
                    setShowPopup(true);
                    setPopup({ show: true });
                }}>more_vert</button>
                {showPopup && popup.show && <div className="popup doc-popup" onClick={(e) => e.preventDefault()}>
                    <div className="popup-home">
                        <span className="popup-item" onClick={() => window.open("/documents/" + doc.docId, "_blank")}>Open in New Tab
                            <span className="material-symbols-outlined">open_in_new</span>
                        </span>
                        <span className="popup-item" onClick={() => setShowDelete(!showDelete)}>Delete Doc</span>
                        {showDelete && <div className="confirm-popup">
                            <span className="material-symbols-outlined confirm-false" onClick={() => setShowDelete(false)}>
                                close</span>
                            <span className="material-symbols-outlined confirm-true" onClick={() => onDelete(doc)}>
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
