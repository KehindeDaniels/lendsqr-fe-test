// src/components/UserDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, Outlet, Link, useNavigate } from "react-router-dom";
import { UserDetails as UserDetailsType } from "../types/types";
import { useUsers } from "../context/userContext";

const UserDetails: React.FC = () => {
  const { userId } = useParams();
  const { userDetails, fetchUserDetails } = useUsers();
  const [userDetail, setUserDetail] = useState<UserDetailsType | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails.length) {
      fetchUserDetails(); // Make sure details are loaded
    }
    const detail = userDetails.find((user) => user.id === userId);
    if (detail) {
      setUserDetail(detail);
    } else {
      navigate("/404");
    }
  }, [userId, userDetails, fetchUserDetails, navigate]);

  return (
    <div>
      <h2>User Details: {userDetail?.fullName}</h2>
      <nav>
        <ul>
          <li>
            <Link to="">General Details</Link>
          </li>
          <li>
            <Link to="employment">Employment (404)</Link>
          </li>
          <li>
            <Link to="bank">Bank Details (404)</Link>
          </li>
          <li>
            <Link to="socials">Socials (404)</Link>
          </li>
        </ul>
      </nav>
      <Outlet /> {/* Render sub-route components */}
    </div>
  );
};

export default UserDetails;
