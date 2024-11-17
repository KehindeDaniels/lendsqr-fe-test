// src/components/UserSummary.tsx
import React from "react";
import "./userSummary.scss";

// Icons
import userIcon from "../../assets/activeUser.svg";
import activeIcon from "../../assets/activeUser.svg";
import loanIcon from "../../assets/loanUsers.svg";
import savingsIcon from "../../assets/savinUsers.svg";

// Summary card data
const summaryData = [
  { title: "USERS", value: "2,453", icon: userIcon },
  { title: "ACTIVE USERS", value: "2,453", icon: activeIcon },
  { title: "USERS WITH LOANS", value: "12,453", icon: loanIcon },
  { title: "USERS WITH SAVINGS", value: "102,453", icon: savingsIcon },
];

const UserSummary: React.FC = () => {
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
