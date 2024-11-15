// src/components/Dashboard.tsx
import React from "react";
// import UserList from "./UserList";
import UserList from "../components/userList";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <UserList />{" "}
    </div>
  );
};

export default Dashboard;
