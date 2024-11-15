// src/components/ActionMenu.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ActionMenuProps {
  userId: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ userId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu(!showMenu);
  const handleViewDetails = () => navigate(`/dashboard/users/${userId}`);
  const handleBlacklistUser = () => {
    // Implement blacklist functionality
    console.log("Blacklist User", userId);
    toggleMenu();
  };
  const handleActivateUser = () => {
    // Implement activate functionality
    console.log("Activate User", userId);
    toggleMenu();
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={toggleMenu}
        style={{ border: "none", background: "transparent", cursor: "pointer" }}
      >
        &#x22EE; {/* Unicode for vertical ellipsis */}
      </button>
      {showMenu && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "0",
            background: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            zIndex: 100,
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li>
              <button onClick={handleViewDetails}>View Details</button>
            </li>
            <li>
              <button onClick={handleBlacklistUser}>Blacklist User</button>
            </li>
            <li>
              <button onClick={handleActivateUser}>Activate User</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
