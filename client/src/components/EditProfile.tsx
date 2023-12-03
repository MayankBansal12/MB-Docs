import { Link } from "react-router-dom"
import Header from "./Header"
import makeRequest from "../utils/api";
import { useEffect, useState } from "react";
import { UserType } from "../types/types";

const EditProfile = () => {
    const [user, setUser] = useState<UserType>();
    const [name, setName] = useState("");
    const [passwd, setPasswd] = useState("");
    const [confirm, setConfirm] = useState("");

    const fetchUserDetails = async () => {
        const res = await makeRequest("GET", "/user");
        setUser(res.data.user);
        console.log(res.data.user);
    }

    const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = user?.email;
        const res = await makeRequest("PUT", "/user", { name, email, passwd });
        if (res.status === 200) {
            console.log("Profile Updated!");
            window.location.reload();
        } else {
            console.log("Error while updating the profile!");
        }
    }

    useEffect(() => {
        if (!user) {
            fetchUserDetails();
        } else
            setName(user.name + "");
    }, [user])

    return (
        <>
            <Header page="" />
            <Link to="/" className="profile-header"><span className="material-symbols-outlined">arrow_back</span> Back to Home</Link>
            <div className="container profile-container">
                <div>
                    <span className="material-symbols-outlined">
                        account_circle
                    </span>
                    <p>Avatar Coming Soon!</p>
                </div>
                <form className="profile-form" onSubmit={updateProfile}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Email" disabled value={user ? user.email + "" : "Your Email Address"} />
                    <input type="password" placeholder="Set New Password" value={passwd} onChange={(e) => setPasswd(e.target.value)} />
                    <input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                    {confirm === passwd ? <button type="submit">Update</button> : <p className="error-message">Please confirm your password before signing up</p>}
                </form>
            </div>
        </>
    )
}

export default EditProfile
