import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Noty from "noty";
const frontend = import.meta.env.VITE_CLIENT;

type PopupProps = {
    page: string
}

const Popup = ({ page }: PopupProps) => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const { id: docId } = useParams();

    // Noty js notification
    const successNoty = new Noty({
        text: "User logged out!",
        type: "success",
        theme: "semanticui",
        timeout: 3000,
    });

    const copyNoty = new Noty({
        text: "Link Copied!",
        type: "info",
        theme: "semanticui",
        timeout: 1500,
    });

    const errorCopyNoty = new Noty({
        text: "Error while copying, try again!",
        type: "error",
        theme: "semanticui",
        timeout: 2000,
    });


    // Remove the token and redirect to login route
    const logoutUser = () => {
        localStorage.removeItem("token");
        successNoty.show();
        navigate("/login");
    }

    // Writing text to clipboard
    const copyLink = () => {
        const textToCopy = frontend + "/documents/" + docId;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                copyNoty.show();
            })
            .catch(() => {
                errorCopyNoty.show();
            });
    };

    return (
        <div className="popup">
            {page === "home" && <div className="popup-home">
                <span className="popup-item"><Link to="/edit-profile" >Edit Profile</Link></span>
                <span className="popup-item" onClick={() => setShowLogout(!showLogout)}>Logout</span>
                {showLogout && <div className="confirm-logout">
                    <span className="material-symbols-outlined logout-false" onClick={() => setShowLogout(false)}>
                        close</span>
                    <span className="material-symbols-outlined logout-true" onClick={logoutUser}>
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
