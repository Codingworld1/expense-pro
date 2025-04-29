import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, ClipboardList, FileText, BarChart, LogOut } from "lucide-react";
import "./Sidebar.css";

const ManagerSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <h2 className="brand">Expense Pro</h2>
      <nav>
        <NavLink to="/manager/dashboard">
          <Home size={18} /> Dashboard
        </NavLink>
        <NavLink to="/manager/team-expenses">
          <FileText size={18} /> Team Expenses
        </NavLink>
        <NavLink to="/manager/my-expenses">
          <FileText size={18} /> My Expenses
        </NavLink>
        <NavLink to="/manager/new-expense">
          <ClipboardList size={18} /> New Expense
        </NavLink>
        <NavLink to="/manager/approvals">
          <ClipboardList size={18} /> Approvals
        </NavLink>
        <NavLink to="/manager/reports">
          <FileText size={18} /> Reports
        </NavLink>
        <NavLink to="/manager/analytics">
          <BarChart size={18} /> Analytics
        </NavLink>
      </nav>
      <div className="sidebar-bottom">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={16} className="logout-icon" />
          <span>Log out</span>
        </button>
      </div>

    </aside>
  );
};

export default ManagerSidebar;
