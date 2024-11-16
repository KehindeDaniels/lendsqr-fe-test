// src/components/UserDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, Outlet, NavLink, useNavigate } from "react-router-dom";
import { UserDetails as UserDetailsType } from "../types/types";
import { useUsers } from "../context/userContext";

const UserDetails: React.FC = () => {
  const { userId } = useParams();
  const { userDetails, fetchUserDetails } = useUsers();
  const [userDetail, setUserDetail] = useState<UserDetailsType | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching user details only if they are not already loaded
    if (userDetails.length === 0) {
      fetchUserDetails();
    } else {
      const detail = userDetails.find((user) => user.id === userId);
      if (!detail) {
        navigate("/404");
      } else {
        setUserDetail(detail);
      }
    }
  }, [userId, userDetails, fetchUserDetails, navigate]);

  // Tab navigation styling for active links
  const activeStyle = {
    textDecoration: "underline",
    color: "blue",
  };

  return (
    <div>
      <h2>User Details: {userDetail?.fullName || "Loading..."}</h2>
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
              to="employment"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Employment (404)
            </NavLink>
          </li>
          <li>
            <NavLink
              to="bank"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Bank Details (404)
            </NavLink>
          </li>
          <li>
            <NavLink
              to="socials"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Socials (404)
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet /> {/* Render sub-route components */}
    </div>
  );
};

export default UserDetails;
