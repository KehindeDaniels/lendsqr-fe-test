import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import "./layout.scss";

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <div className="navBar">
        <NavBar />
      </div>
      <div className="container">
        <div className="sidebar-layout">
          <SideBar />
        </div>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
