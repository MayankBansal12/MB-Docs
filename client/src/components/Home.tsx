import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DocumentType, UserType } from "../types/types";
import Header from "./Header";
import makeRequest from "../utils/api";

const Home = () => {
  let [document, setDoc] = useState<DocumentType[]>();
  const [user, setUser] = useState<UserType>();

  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await makeRequest("GET", "/doc");
    setDoc(res?.data?.documents);
  }

  const fetchUser = async () => {
    const res = await makeRequest("GET", "/user");
    setUser(res?.data?.user);
  }

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
        {document && document.length > 0 ? document?.map((doc, i) => {
          return (
            <Link to={"/documents/" + doc.docId} className="tile" key={i}>
              <div className="icon edit">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div className="content">
                <div className="heading">{doc.title}</div>
                <div className="date">
                  Last Opened: {new Date(doc.updatedAt).toISOString().split('T')[0]}
                </div>
              </div>
            </Link>
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
