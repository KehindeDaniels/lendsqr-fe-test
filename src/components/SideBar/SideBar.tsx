// src/components/SideBar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sideBar.scss";

import {
  ArrowDownIcon,
  AuditIcon,
  DecisionIcon,
  FeesIcon,
  FeesAndPricingIcon,
  GuarantorsIcon,
  HomeIcon,
  KarmaIcon,
  LoanIcon,
  LogOutIcon,
  ReportIcon,
  RequestLoanIcon,
  SavingsIcon,
  ServiceAccountIcon,
  ServicesIcon,
  SettlementIcon,
  SystemMessageIcon,
  TransactionIcon,
  UsersIcon,
  WhitelistIcon,
  OrganizationIcon,
} from "../../assets";
import { NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sideBarItems = [
    {
      category: "Customers",
      items: [
        { name: "Users", icon: UsersIcon, path: "/dashboard" },
        { name: "Guarantors", icon: GuarantorsIcon, path: "/guarantors" },
        { name: "Loans", icon: LoanIcon, path: "/loans" },
        {
          name: "Decision Models",
          icon: DecisionIcon,
          path: "/decision-models",
        },
        { name: "Savings", icon: SavingsIcon, path: "/savings" },
        {
          name: "Loan Requests",
          icon: RequestLoanIcon,
          path: "/loan-requests",
        },
        { name: "Whitelist", icon: WhitelistIcon, path: "/whitelist" },
        { name: "Karma", icon: KarmaIcon, path: "/karma" },
      ],
    },
    {
      category: "Businesses",
      items: [
        { name: "Organization", icon: OrganizationIcon, path: "/organization" },
        { name: "Loan Products", icon: LoanIcon, path: "/loan-products" },
        {
          name: "Savings Products",
          icon: SavingsIcon,
          path: "/savings-products",
        },
        { name: "Fees and Charges", icon: FeesIcon, path: "/fees-and-charges" },
        {
          name: "Transactions",
          icon: TransactionIcon,
          path: "/TransactionIcons",
        },
        { name: "Services", icon: ServicesIcon, path: "/services" },
        {
          name: "Service Account",
          icon: ServiceAccountIcon,
          path: "/service-account",
        },
        { name: "Settlements", icon: SettlementIcon, path: "/settlements" },
        { name: "Reports", icon: ReportIcon, path: "/reports" },
      ],
    },
    {
      category: "Settings",
      items: [
        { name: "Preferences", icon: SystemMessageIcon, path: "/preferences" },
        {
          name: "Fees and Pricing",
          icon: FeesAndPricingIcon,
          path: "/fees-pricing",
        },
        { name: "Audit Logs", icon: AuditIcon, path: "/audit-logs" },
        {
          name: "System Messages",
          icon: SystemMessageIcon,
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
        <img src={OrganizationIcon} alt="Organization" />
        <span className="switch-organization-text">Switch Organization</span>
        <img src={ArrowDownIcon} alt="Arrow Down" className="arrow-icon" />
      </div>
      <h1 className="dashboard-title">
        <img src={HomeIcon} alt="Home" />
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
            <img src={LogOutIcon} alt="Logout" />
            <span className="logout-text">Logout</span>
          </Link>
          <p>v1.20</p>
        </footer>
      </div>
    </div>
  );
};

export default SideBar;
