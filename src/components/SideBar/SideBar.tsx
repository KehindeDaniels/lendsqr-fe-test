// src/components/SideBar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sideBar.scss";

// Icons import
import arrowDown from "../../assets/icons/arrowDown.svg";
import audit from "../../assets/icons/audit.svg";
import decision from "../../assets/icons/decision.svg";
import fees from "../../assets/icons/fees.svg";
import feesAndPricing from "../../assets/icons/feesandPricing.svg";
import guarantors from "../../assets/icons/guarantors.svg";
import home from "../../assets/icons/home.svg";
import karma from "../../assets/icons/karma.svg";
import loan from "../../assets/icons/loan.svg";
import logOut from "../../assets/icons/logOut.svg";
import report from "../../assets/icons/report.svg";
import requestLoan from "../../assets/icons/requestloan.svg";
import savings from "../../assets/icons/savings.svg";
import serviceAccount from "../../assets/icons/serviceAccount.svg";
import services from "../../assets/icons/services.svg";
import settlement from "../../assets/icons/settlement.svg";
import systemMessage from "../../assets/icons/systemmessage.svg";
import transaction from "../../assets/icons/transaction.svg";
import users from "../../assets/icons/users.svg";
import whitelist from "../../assets/icons/whitelist.svg";
import organization from "../../assets/icons/organisation.svg";
import { NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sideBarItems = [
    {
      category: "Customers",
      items: [
        { name: "Users", icon: users, path: "/dashboard" },
        { name: "Guarantors", icon: guarantors, path: "/guarantors" },
        { name: "Loans", icon: loan, path: "/loans" },
        { name: "Decision Models", icon: decision, path: "/decision-models" },
        { name: "Savings", icon: savings, path: "/savings" },
        { name: "Loan Requests", icon: requestLoan, path: "/loan-requests" },
        { name: "Whitelist", icon: whitelist, path: "/whitelist" },
        { name: "Karma", icon: karma, path: "/karma" },
      ],
    },
    {
      category: "Businesses",
      items: [
        { name: "Organization", icon: organization, path: "/organization" },
        { name: "Loan Products", icon: loan, path: "/loan-products" },
        { name: "Savings Products", icon: savings, path: "/savings-products" },
        { name: "Fees and Charges", icon: fees, path: "/fees-and-charges" },
        { name: "Transactions", icon: transaction, path: "/transactions" },
        { name: "Services", icon: services, path: "/services" },
        {
          name: "Service Account",
          icon: serviceAccount,
          path: "/service-account",
        },
        { name: "Settlements", icon: settlement, path: "/settlements" },
        { name: "Reports", icon: report, path: "/reports" },
      ],
    },
    {
      category: "Settings",
      items: [
        { name: "Preferences", icon: systemMessage, path: "/preferences" },
        {
          name: "Fees and Pricing",
          icon: feesAndPricing,
          path: "/fees-pricing",
        },
        { name: "Audit Logs", icon: audit, path: "/audit-logs" },
        {
          name: "System Messages",
          icon: systemMessage,
          path: "/system-messages",
        },
      ],
    },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        <div className={`bar ${isOpen ? "open" : "closed"}`}></div>
      </button>
      <div className="switch-organization">
        <img src={organization} alt="Organization" />
        <span className="switch-organization-text">Switch Organization</span>
        <img src={arrowDown} alt="Arrow Down" className="arrow-icon" />
      </div>
      <h1 className="dashboard-title">
        <img src={home} alt="Home" />
        <span className="dashboard-text">Dashboard</span>
      </h1>
      <div className="menu">
        {sideBarItems.map((category) => (
          <div className="category" key={category.category}>
            <h3>{category.category}</h3>
            <div className="items">
              {category.items.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.name}
                  className={({ isActive }) =>
                    isActive ? "item active" : "item"
                  }
                >
                  <img src={item.icon} alt={item.name} className="item-icon" />
                  <div className="item-name">{item.name}</div>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
        <footer className="sidebar-footer">
          <Link to="/" className="logout">
            <img src={logOut} alt="Logout" />
            <span className="logout-text">Logout</span>
          </Link>
          <p>v1.20</p>
        </footer>
      </div>
    </div>
  );
};

export default SideBar;
