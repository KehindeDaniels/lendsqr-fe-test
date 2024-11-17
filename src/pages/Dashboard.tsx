// src/pages/Dashboard.tsx
import React from "react";
import UserList from "../components/userList";
import UserSummary from "../components/userSummary/UserSummary";

const Dashboard: React.FC = () => {
  return (
    <div>
      <UserSummary />
      <UserList />
    </div>
  );
};

export default Dashboard;
