import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { notify } from "../utils/notification";
const frontend = import.meta.env.VITE_CLIENT;

type PopupProps = {
    page: string
}

const Popup = ({ page }: PopupProps) => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const { id: docId } = useParams();


    // Remove the token and redirect to login route
    const logoutUser = () => {
        localStorage.removeItem("token");
        notify("User logged out!", "success");
        navigate("/login");
    }

    // Writing text to clipboard
    const copyLink = () => {
        const textToCopy = frontend + "/documents/" + docId;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                notify("Link Copied!", "info", 1500);
            })
            .catch(() => {
                notify("Error while copying, try again!", "error", 1500);
            });
    };

    return (
        <div className="popup">
            {page === "home" && <div className="popup-home">
                <span className="popup-item"><Link to="/edit-profile" >Edit Profile</Link></span>
                <span className="popup-item" onClick={() => setShowLogout(!showLogout)}>Logout</span>
                {showLogout && <div className="confirm-popup">
                    <span className="material-symbols-outlined confirm-false" onClick={() => setShowLogout(false)}>
                        close</span>
                    <span className="material-symbols-outlined confirm-true" onClick={logoutUser}>
                        check
                    </span>
                </div>}
            </div>}

            {page === "editor" && <div className="popup-editor">
                <p>Anyone with the link can open
                    and edit the document.
                    Be careful while sharing it publicly!
                </p>
                <div>
                    <input placeholder="Link" value={frontend + "/documents/" + docId} disabled />
                    <button className="material-symbols-outlined" onClick={copyLink}>content_copy</button>
                </div>
            </div>}
        </div>
    )
}

export default Popup
