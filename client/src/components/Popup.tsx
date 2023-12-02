import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

type PopupProps = {
    page: string
}

const Popup = ({ page }: PopupProps) => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);

    // Remove the token and redirect to login route
    const logoutUser = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

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
                    Be careful while sharing it publicly!</p>
                <input placeholder="Link" value={"link"} disabled />
                <button>Copy</button>
            </div>}
        </div>
    )
}

export default Popup
