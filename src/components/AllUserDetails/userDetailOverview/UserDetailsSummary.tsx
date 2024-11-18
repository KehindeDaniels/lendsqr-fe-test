import React from "react";
import avatarIcon from "../../../assets/avatar.png"; // Ensure path is correct
import { UserDetails as UserDetailsType } from "../../../types/types";
import "./userDetailsSummary.scss";

interface UserDetailsSummaryProps {
  userDetail: UserDetailsType | undefined;
}

const UserDetailsSummary: React.FC<UserDetailsSummaryProps> = ({
  userDetail,
}) => {
  return (
    <div className="userDetailsSummary">
      <div className="user-info">
        <div className="avatar-name">
          <img src={avatarIcon} alt="User Avatar" className="user-avatar" />
          <div className="name-id">
            <h1>{userDetail?.fullName}</h1>
            <p>{userDetail?.id}</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="user-titer">
          <span>User's Tier:</span>
          <p>
            {userDetail?.userTier
              ? "★".repeat(userDetail.userTier) +
                "☆".repeat(5 - userDetail.userTier)
              : "★★★★★"}
          </p>
        </div>
        <div className="divider"></div>

        <div className="bank">
          <p>{userDetail?.employmentInfo.monthlyIncome}</p>
          <p>{`${userDetail?.bank.accountNumber} / ${userDetail?.bank.name}`}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsSummary;
