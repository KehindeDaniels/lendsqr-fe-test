import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../context/UserContext";
import eye from "../../assets/eye.svg";
import blacklist from "../../assets/blacklist.svg";
import activate from "../../assets/activate.svg";
import "./actionMenu.scss";
interface ActionMenuProps {
  userId: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ userId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { updateUserStatus } = useUsers();
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu(!showMenu);
  const handleViewDetails = () => navigate(`/dashboard/users/${userId}`);
  const handleBlacklistUser = () => {
    updateUserStatus(userId, "Blacklisted");
    toggleMenu();
  };
  const handleActivateUser = () => {
    updateUserStatus(userId, "Active");
    toggleMenu();
  };

  return (
    <div className="menu-container">
      <button className="menu-button" onClick={toggleMenu}>
        &#x22EE; {/* Vertical ellipsis */}
      </button>
      {showMenu && (
        <div className="menu-dropdown">
          <ul>
            <li onClick={handleViewDetails}>
              <img src={eye} alt="View Details" />
              View Details
            </li>
            <li onClick={handleBlacklistUser}>
              <img src={blacklist} alt="Blacklist User" />
              Blacklist User
            </li>
            <li onClick={handleActivateUser}>
              <img src={activate} alt="Activate User" />
              Activate User
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
