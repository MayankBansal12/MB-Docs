import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DocumentType, UserType } from "../types/types";
import Header from "./Header";
import makeRequest from "../utils/api";
import DocTile from "./DocTile";

const Home = () => {
  let [document, setDoc] = useState<DocumentType[]>();
  const [user, setUser] = useState<UserType>();
  const navigate = useNavigate();

  // Fetch all the docs for that user
  const fetchData = async () => {
    const res = await makeRequest("GET", "/doc");
    setDoc(res?.data?.documents);
  }

  // Fetch User details
  const fetchUser = async () => {
    const res = await makeRequest("GET", "/user");
    setUser(res?.data?.user);
  }

  // check for user token and fetch details
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUser();
      fetchData();
    }
  }, [])

  return (
    <>
      <Header page="home" user={user} />
      <div className="container">
        {/* <div className="popup-overlay"></div> */}
        {document && document.length > 0 ? document?.map((doc, i) => {
          return (
            <DocTile doc={doc} key={i} />
          );
        })
          :
          <div className="data-info">No Documents to show...Create new document and write your ideas, thoughts and collaborate with your friends...Start now by clicking on the button below </div>
        }
      </div>
      <Link className="circle" to="/editor">
        <div className="icon">
          <span className="material-symbols-outlined">add</span>
        </div>
      </Link>
    </>
  )
}

export default Home;
