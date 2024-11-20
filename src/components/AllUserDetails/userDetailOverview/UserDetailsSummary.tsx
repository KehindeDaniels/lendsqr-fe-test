import React from "react";
import { User } from "../../../types/types";
import "./userDetailsSummary.scss";

interface UserDetailsSummaryProps {
  userDetail: User | undefined;
}

const UserDetailsSummary: React.FC<UserDetailsSummaryProps> = ({
  userDetail,
}) => {
  console.log("detailsPage", userDetail);
  return (
    <div className="userDetailsSummary">
      <div className="user-info">
        <div className="avatar-name">
          <img
            src={`https://avatars.dicebear.com/api/micah/random.svg?background=%23f3f4f6&size=100

`}
            alt="User Avatar"
            className="user-avatar"
          />
          <div className="name-id">
            <h1>{userDetail?.generalInfo.fullName}</h1>
            <p>{userDetail?.generalInfo.id}</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="user-titer">
          <span>User's Tier:</span>
          <p>
            {userDetail?.personalInfo.userTier
              ? "★".repeat(userDetail.personalInfo.userTier) +
                "☆".repeat(5 - userDetail.personalInfo.userTier)
              : "★★★★★"}
          </p>
        </div>
        <div className="divider"></div>

        <div className="bank">
          <p>{userDetail?.employmentInfo.monthlyIncome}</p>
          <p>{`${userDetail?.bank.accountNumber} / ${userDetail?.bank.name}`}</p>
        </div>

        <div className="userStatus">
          <p
            className={
              userDetail?.generalInfo.status === "Active"
                ? "active"
                : userDetail?.generalInfo.status === "Blacklisted"
                ? "blacklisted"
                : userDetail?.generalInfo.status === "Inactive"
                ? "sinactive"
                : "spending"
            }
          >
            {userDetail?.generalInfo.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsSummary;
