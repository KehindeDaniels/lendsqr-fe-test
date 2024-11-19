import React from "react";
import { UserDetails as UserDetailsType } from "../../../types/types";
import "./userDetailsSummary.scss";

interface UserDetailsSummaryProps {
  userDetail: UserDetailsType | undefined;
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
            <h1>{userDetail?.fullName}</h1>
            <p>{userDetail?.id}</p>
          </div>
        </div>
        {/* <div className="divider"></div>
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

        <div className="userStatus">
          <p
            className={
              userDetail?.status === "Active"
                ? "active"
                : userDetail?.status === "Blacklisted"
                ? "blacklisted"
                : userDetail?.status === "Inactive"
                ? "sinactive"
                : "spending"
            }
          >
            {userDetail?.status}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default UserDetailsSummary;
