import React from "react";
import "./navBar.css";
import logo from "../images/solarlogo.svg";
import { Link } from "react-router-dom";


export default function NavBar() {
  function showMenu() {
    if (document.getElementById("navLinks")) {
      document.getElementById("navLinks").style.right = "0px";
    }
  }
  function hideMenu() {
    if (document.getElementById("navLinks")) {
      document.getElementById("navLinks").style.right = "-200px";
    }
  }

  return (
    <nav>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <a href="/home">
        <img src={logo} alt=""></img>
      </a>
      <div className="nav-links" id="navLinks">
        <i className="fa fa-times" onClick={hideMenu}></i>
        <ul>
          <li>
            <Link to="/home">HOME</Link>
          </li>
          <li className="dropdown">
            <p style={{ color: "white", fontSize: "13px" }}>PRODUCTS</p>
            <div className="dropdown-content">
               <Link to="/batteries" style={{ color: "black" }}> 
                batteries
              </Link>
              <Link to="/panels" style={{ color: "black" }}>
                panels
              </Link>
              <Link to="/inverters" style={{ color: "black" }}>
                inverters
              </Link>
            </div>
          </li>
          <li>
            <Link to="/packages">PACKAGES</Link>
          </li>
          <li>
            <Link to="/aboutus">ABOUT-US</Link>
          </li>
          <li>
            <Link to="/contactus">CONTACT-US</Link>
          </li>
        </ul>
      </div>
      <i className="fa fa-bars" onClick={() => showMenu()}></i>
    </nav>
  );
}
