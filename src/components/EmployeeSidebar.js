import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, FileText, ClipboardList, LogOut } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import ResetPasswordModal from "./ResetPasswordModal";
import "./Sidebar.css";
import "./ProfileModal.css";

const EmployeeSidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  let initials = "U";
  let email = "";
  let role = "";
  let firstName = "";
  let lastName = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      initials = decoded.initials || "U";
      email = decoded.sub || "";
      role = decoded.role || "";
      firstName = decoded.firstName || "";
      lastName = decoded.lastName || "";
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const fullName = `${firstName} ${lastName}`.trim();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    navigate("/");
  };

  const closeModals = () => {
    setShowProfileModal(false);
    setShowResetModal(false);
  };

  const backToProfile = () => {
    setShowResetModal(false);
    setShowProfileModal(true);
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
        <div className="profile-circle" onClick={() => setShowProfileModal(true)}>
          {initials}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={16} className="logout-icon" />
          <span>Log out</span>
        </button>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>User Profile</h3>
            <p><strong>Name:</strong> {fullName || "N/A"}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Role:</strong> {role}</p>
            <div className="buttons-row">
              <button
                className="change-password-btn"
                onClick={() => {
                  setShowProfileModal(false);
                  setShowResetModal(true);
                }}
              >
                Change Password
              </button>
              <button className="close-btn" onClick={closeModals}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && (
        <ResetPasswordModal
          token={token}
          onClose={closeModals}
          onBackToProfile={backToProfile}
        />
      )}
    </aside>
  );
};

export default EmployeeSidebar;
