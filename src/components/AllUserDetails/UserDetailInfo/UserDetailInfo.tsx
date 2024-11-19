import React from "react";
import { UserDetails as UserDetailsType } from "../../../types/types";
import "./userDetailInfo.scss";
interface UserDetailInfoProps {
  userDetail: UserDetailsType | undefined;
}

const UserDetailInfo: React.FC<UserDetailInfoProps> = ({ userDetail }) => {
  if (!userDetail) return <div>Loading...</div>;

  // Define the data sections
  const sections = [
    {
      title: "Personal Information",
      data: [
        { label: "Full Name", value: userDetail.fullName },
        { label: "Phone Number", value: userDetail.personalInfo.phone },
        { label: "Email Address", value: userDetail.personalInfo.email },
        { label: "BVN", value: userDetail.bank.bvn },
        { label: "Gender", value: userDetail.personalInfo.gender },
        {
          label: "Marital Status",
          value: userDetail.personalInfo.maritalStatus,
        },
        { label: "Children", value: userDetail.personalInfo.children },
        {
          label: "Type of Residence",
          value: userDetail.personalInfo.typeOfResidence,
        },
      ],
    },
    {
      title: "Education and Employment",
      data: [
        {
          label: "Level of Education",
          value: userDetail.employmentInfo.levelOfEducation,
        },
        {
          label: "Employment Status",
          value: userDetail.employmentInfo.employmentStatus,
        },
        {
          label: "Sector of Employment",
          value: userDetail.employmentInfo.sectorOfEmployment,
        },
        {
          label: "Duration of Employment",
          value: userDetail.employmentInfo.durationOfEmployment,
        },
        { label: "Office Email", value: userDetail.employmentInfo.officeEmail },
        {
          label: "Monthly Income",
          value: userDetail.employmentInfo.monthlyIncome,
        },
        {
          label: "Loan Repayment",
          value: userDetail.employmentInfo.loanRepayment,
        },
      ],
    },
    {
      title: "Socials",
      data: [
        { label: "Twitter", value: userDetail.socials.twitter },
        { label: "Facebook", value: userDetail.socials.facebook },
        { label: "Instagram", value: userDetail.socials.instagram },
      ],
    },
    {
      title: "Guarantor",
      data: [
        { label: "Full Name", value: userDetail.guarantor.fullName },
        { label: "Phone Number", value: userDetail.guarantor.phone },
        { label: "Email Address", value: userDetail.guarantor.email },
        { label: "Relationship", value: userDetail.guarantor.relationship },
      ],
    },
  ];

  console.log("info");
  return (
    <div className="userDetailInfo-container">
      {sections.map((section) => (
        <div key={section.title} className="section-container">
          <h2>{section.title}</h2>
          <div className="section-details">
            {section.data.map((item) => (
              <div className="label-container">
                <p key={item.label} className="section-label">
                  <span>{item.label}:</span> {item.value}
                  {/* {item.label}: {item.value} */}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDetailInfo;
