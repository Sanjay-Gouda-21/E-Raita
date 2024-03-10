import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logoagri.png";
import "./css/Navbar.css";
import { ReactComponent as NavIcon } from "./navicon.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faExternalLinkSquare,
  faStore,
  faMagnifyingGlass,
  faAddressBook,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <img src={logo} alt="logo" height="40px" />
      <Link to="/" className="brand-name">
        e-Raita
      </Link>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <NavIcon width="20" height="20" color="white" />
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            <Link to="/Home">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li>
            <Link to="/AgriNews">
              <FontAwesomeIcon icon={faExternalLinkSquare} /> SCHEMES
            </Link>
          </li>
          <li>
            <Link to="/FarmersMarket">
              <FontAwesomeIcon icon={faStore} /> STORE
            </Link>
          </li>
          <li>
            <Link to="/Hire">
              <FontAwesomeIcon icon={faSearch} /> Labours
            </Link>
          </li>
          <li>
            <Link to="/Contact">
              <FontAwesomeIcon icon={faAddressBook} /> Contact Us
            </Link>
          </li>
          <li>
            <Link to="/MyAccount">
              <FontAwesomeIcon icon={faUser} /> My Account
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
