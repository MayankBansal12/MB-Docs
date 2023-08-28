import React from "react";


const Footer = () => {
  const year=new Date().getFullYear();

  return (
    <footer>
      <div className="copyright">
        Copyright {year}@MB Docs. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
