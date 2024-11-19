import React from "react";
import { NavLink } from "react-router-dom";
import "./navUserDetail.scss";
const UserDetailNav: React.FC = () => {
  return (
    <nav className="user-detail-nav">
      <ul>
        <li>
          <NavLink
            to=""
            end
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            General Details
          </NavLink>
        </li>
        <li>
          <NavLink
            to="documents"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Documents
          </NavLink>
        </li>
        <li>
          <NavLink
            to="bankDetails"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Bank Details
          </NavLink>
        </li>
        <li>
          <NavLink
            to="loans"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Loans
          </NavLink>
        </li>
        <li>
          <NavLink
            to="savings"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Savings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="appSystem"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            App and System
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default UserDetailNav;
