import React, { useState } from "react";
import "./navBar.scss";

import { Link } from "react-router-dom";
import logoIcon from "../../assets/icons/logoicon.svg";
import logoText from "../../assets/icons/logotext.svg";
import searchIcon from "../../assets/search.svg";
import bellIcon from "../../assets/bell.svg";
import arrowDown from "../../assets/dropDown.svg";
import avatar from "../../assets/avatar.png";

const NavBar: React.FC = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo Section */}
        <div className="logo">
          <img src={logoIcon} alt="Logo" className="logo-icon" />
          <img src={logoText} alt="Logo Text" className="logo-text" />
        </div>

        {/* Search Section */}
        <div className={`search-bar ${isSearchVisible ? "visible" : ""}`}>
          <input
            type="text"
            placeholder="Search for anything"
            className="search-input"
          />
          <button className="search-toggle" onClick={toggleSearch}>
            <img src={searchIcon} alt="Search" />
          </button>
        </div>

        {/* User Info Section */}
        <div className="user-info">
          <Link to="/docs" className="docs-link">
            Docs
          </Link>
          <img
            src={bellIcon}
            alt="Notifications"
            className="notification-icon"
          />
          <div className="profile">
            <img src={avatar} alt="User Avatar" className="avatar" />
            <div className="user-dropdown">
              <span className="username">Adedeji</span>
              <img src={arrowDown} alt="Dropdown" className="dropdown-icon" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
