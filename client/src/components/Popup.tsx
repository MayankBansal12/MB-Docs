import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
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
        navigate("/login");
    }

    // Writing text to clipboard
    const copyLink = () => {
        const textToCopy = frontend + "/documents/" + docId;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Text successfully copied to clipboard');
            })
            .catch((err) => {
                console.error('Unable to copy text to clipboard', err);
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
