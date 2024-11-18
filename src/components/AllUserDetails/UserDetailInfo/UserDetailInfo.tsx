// src/components/UserDetailInfo.tsx
import React from "react";
import { UserDetails as UserDetailsType } from "../../../types/types";

interface UserDetailInfoProps {
  userDetail: UserDetailsType | undefined;
}

const UserDetailInfo: React.FC<UserDetailInfoProps> = ({ userDetail }) => {
  return (
    <div className="userDetailInf0">
      <div className="personalInfo">
        {userDetail?.personalInfo.email && (
          <p>
            <strong>Email:</strong> {userDetail.personalInfo.email}
          </p>
        )}
      </div>
      <div className="employmentInfo">
        {userDetail?.employmentInfo.levelOfEducation && (
          <p>
            <strong>Education:</strong>{" "}
            {userDetail.employmentInfo.levelOfEducation}
          </p>
        )}
        {userDetail?.employmentInfo.employmentStatus && (
          <p>
            <strong>Employment:</strong>{" "}
            {userDetail.employmentInfo.employmentStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDetailInfo;
