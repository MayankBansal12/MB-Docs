import logo from "../../src/assets/OIP.jpeg";

const Header = () => {
  return (
    <nav className="header">
      <a href="/" className="logo">
        <img src={logo} alt="Logo" />
        <span>
          MB DOCS
        </span>
      </a>
      <div className="nav-list">
        <a href="/logout" className="btn">Logout</a>
      </div>
    </nav>
  )
}

export default Header
