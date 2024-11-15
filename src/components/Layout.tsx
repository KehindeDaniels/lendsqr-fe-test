// src/components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
// import SideBar from "./SideBar"; // Make sure SideBar has a default export

import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <NavBar />
      <SideBar />
      <div className="main-content">
        <div className="content">
          <Outlet /> {/* This will render the matched child route component */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
