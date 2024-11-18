// src/components/UserDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import { UserDetails as UserDetailsType } from "../types/types";
import { useUsers } from "../context/UserContext";
import UserDetailsSummary from "../components/AllUserDetails/userDetailOverview/UserDetailsSummary";
import UserDetailNav from "../components/AllUserDetails/UserDetailNav/UserDetailNav";
import UserDetailInfo from "../components/AllUserDetails/UserDetailInfo/UserDetailInfo";

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
    <div>
      {/* <UserDetailsSummary userDetail={userDetail} /> */}
      <UserDetailsSummary userDetail={userDetail} />
      {/* <UserDetailNav /> */}
      <UserDetailNav />
      <hr />
      <Outlet /> {/* Render sub-route components */}
      {/* <UserDetailInfo userDetail={userDetail} /> */}
      <UserDetailInfo userDetail={userDetail} />
    </div>
  );
};

export default UserDetails;
