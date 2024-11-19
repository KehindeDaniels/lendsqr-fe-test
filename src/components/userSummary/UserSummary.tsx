import React from "react";
import { useUsers } from "../../context/UserContext";
import "./userSummary.scss";

import userIcon from "../../assets/allUsers.svg";
import activeIcon from "../../assets/activeUser.svg";
import loanIcon from "../../assets/loanUsers.svg";
import savingsIcon from "../../assets/savinUsers.svg";

const UserSummary: React.FC = () => {
  const { userList } = useUsers();

  const summaryData = [
    { title: "USERS", value: userList.length.toString(), icon: userIcon },
    {
      title: "ACTIVE USERS",
      value: userList
        .filter((user) => user.status === "Active")
        .length.toString(),
      icon: activeIcon,
    },
    {
      title: "USERS WITH LOANS",
      value: userList.filter((user) => user.hasLoan).length.toString(),
      icon: loanIcon,
    },
    {
      title: "USERS WITH SAVINGS",
      value: userList.filter((user) => user.hasSavings).length.toString(),
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
