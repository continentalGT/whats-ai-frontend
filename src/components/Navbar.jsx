import React from "react";
import "../App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><a href="#">Home</a></li>
        <li><a href="#">Demos</a></li>
        <li><a href="#">Services</a></li> {/* ✅ New item added */}
        <li><a href="#">Blog</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
