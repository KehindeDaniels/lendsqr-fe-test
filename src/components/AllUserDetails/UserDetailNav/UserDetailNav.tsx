// src/components/AllUserDetails/UserDetailNav/UserDetailNav.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const UserDetailNav: React.FC = () => {
  const activeStyle = {
    textDecoration: "underline",
    color: "blue",
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to=""
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            General Details
          </NavLink>
        </li>
        <li>
          <NavLink
            to="document"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            document
          </NavLink>
        </li>
        <li>
          <NavLink
            to="documents"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            documents
          </NavLink>
        </li>
        <li>
          <NavLink
            to="bankDetails"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            bankDetails
          </NavLink>
        </li>
        <li>
          <NavLink
            to="savings"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            savings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="appSystem"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            appSystem
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default UserDetailNav; // <---- Ensure this is here
