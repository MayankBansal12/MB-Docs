import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="header">
      <Link to="/" className="logo">
        <span className="material-symbols-outlined">
          article
        </span>
        <span>
          MB DOCS
        </span>
      </Link>
      <div className="nav-list">
        <Link to="/logout" className="btn">Logout</Link>
      </div>
    </nav>
  )
}

export default Header
