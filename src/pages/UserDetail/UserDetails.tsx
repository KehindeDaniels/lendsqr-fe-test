// src/components/UserDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import { UserDetails as UserDetailsType } from "../../types/types";
import { useUsers } from "../../context/UserContext";
import UserDetailsSummary from "../../components/AllUserDetails/userDetailOverview/UserDetailsSummary";
import UserDetailNav from "../../components/AllUserDetails/UserDetailNav/UserDetailNav";
import UserDetailInfo from "../../components/AllUserDetails/UserDetailInfo/UserDetailInfo";
import goback from "../../assets/goback.svg";
import "./userDetails.scss";

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

  return (
    <>
      <div className="userdetailaction">
        <button className="goback" onClick={() => navigate(-1)}>
          <img src={goback} alt="Go Back" />
          Back to Users
        </button>

        <div className="header-action">
          <h1>User Details</h1>
          <div className="action">
            <button>Blacklist User</button>
            <button>Activate User</button>
          </div>
        </div>
      </div>
      <div className="user-details-container">
        <div className="user-details-header">
          <UserDetailsSummary userDetail={userDetail} />
          <UserDetailNav />
        </div>
        <div className="user-details-content">
          <Outlet />
          <UserDetailInfo userDetail={userDetail} />
        </div>
      </div>
    </>
  );
};

export default UserDetails;
