import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, FileText, ClipboardList, LogOut } from "lucide-react";
import "./Sidebar.css";

const EmployeeSidebar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("userRole");  // Remove user role from localStorage
    localStorage.removeItem("token");  // Remove JWT token
    navigate("/");  // Redirect to the landing page (or login page)
  };

  return (
    <aside className="sidebar">
      <h2 className="brand">Expense Pro</h2>
      <nav>
        <NavLink to="/employee/dashboard">
          <Home size={18} /> Dashboard
        </NavLink>
        <NavLink to="/employee/my-expenses">
          <FileText size={18} /> My Expenses
        </NavLink>
        <NavLink to="/employee/new-expense">
          <ClipboardList size={18} /> New Expense
        </NavLink>
      </nav>
      <div className="sidebar-bottom">
        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={16} className="logout-icon" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default EmployeeSidebar;
