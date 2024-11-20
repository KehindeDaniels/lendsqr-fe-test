import React from "react";
import { useUsers } from "../../context/UserContext";
import "./userSummary.scss";

import userIcon from "../../assets/allUsers.svg";
import activeIcon from "../../assets/activeUser.svg";
import loanIcon from "../../assets/loanUsers.svg";
import savingsIcon from "../../assets/savinUsers.svg";

const UserSummary: React.FC = () => {
  const { users } = useUsers();

  const summaryData = [
    { title: "USERS", value: users.length.toString(), icon: userIcon },
    {
      title: "ACTIVE USERS",
      value: users
        .filter((user) => user.generalInfo.status === "Active")
        .length.toString(),
      icon: activeIcon,
    },
    {
      title: "USERS WITH LOANS",
      value: users.filter((user) => user.generalInfo.hasLoan).length.toString(),
      icon: loanIcon,
    },
    {
      title: "USERS WITH SAVINGS",
      value: users
        .filter((user) => user.generalInfo.hasSavings)
        .length.toString(),
      icon: savingsIcon,
    },
  ];

  return (
    <>
      <p className="user-title">User</p>
      <div className="user-summary">
        {summaryData.map((item, index) => (
          <div key={index} className="summary-card">
            <div className="icon">
              <img src={item.icon} alt={item.title} />
            </div>
            <div className="details">
              <p className="title">{item.title}</p>
              <p className="value">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserSummary;
