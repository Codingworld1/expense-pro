import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Initial.css";
import cashbag from "../assets/cashbag.png";
import analytics from "../assets/analytics.png";
import target from "../assets/target.png";
import approval from "../assets/approval.png";
import ForgotPasswordModal from "./ForgotPasswordModal"; // Import the ForgotPasswordModal component

const LandingPage = () => {
  const navigate = useNavigate();
  const [isEmployee, setIsEmployee] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false); // State for controlling modal visibility

  const handleLogin = (event) => {
    event.preventDefault();
    if (email && password) {
      localStorage.setItem("userRole", isEmployee ? "employee" : "manager");
      navigate(isEmployee ? "/employee/dashboard" : "/manager/dashboard");
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <>
      <main className="landing-container">
        {/* Left Section */}
        <section className="left-section">
          <h1 className="title">Expense Pro</h1>
          <p className="subtitle">
            A seamless way to <br />
            Track, Manage, and Analyze Your Expenses
          </p>
          <div className="features">
            <div className="feature left">
              <img src={cashbag} alt="Money Bag" className="feature-icon-onleft" />
              <p className="aligned-left">
                Manage and categorize expenses efficiently
              </p>
            </div>
            <div className="feature right">
              <p className="aligned-right">
                Real-time Analytics and reports for financial decisions
              </p>
              <img src={analytics} alt="Analytics" className="feature-icon-onright" />
            </div>
            <div className="feature left">
              <img src={target} alt="Target" className="feature-icon-onright" />
              <p className="aligned-left">
                Quick look at all the payments done through Dashboard
              </p>
            </div>
            <div className="feature right">
              <p className="aligned-right">Seamless Approvals for the Budget</p>
              <img src={approval} alt="Approval" className="feature-icon-onleft" />
            </div>
          </div>
        </section>

        {/* Right Section */}
        <section className="right-section">
          <h2 className="get-started">
            {isEmployee ? "Employee Log In" : "Manager Log In"}
          </h2>
          <div className="toggle-buttons">
            <button
              className={`toggle-btn ${isEmployee ? "active" : ""}`}
              onClick={() => setIsEmployee(true)}
              type="button"
            >
              Employee
            </button>
            <button
              className={`toggle-btn ${!isEmployee ? "active" : ""}`}
              onClick={() => setIsEmployee(false)}
              type="button"
            >
              Manager
            </button>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="enter-btn">
              Enter
            </button>
            <span
              className="forgot-password"
              onClick={() => setShowForgotModal(true)} // Open modal when clicked
              style={{ cursor: "pointer" }}
            >
              Forgot Password?
            </span>
          </form>
        </section>
      </main>

      {/* Forgot Password Modal Component */}
      <ForgotPasswordModal
        showModal={showForgotModal} // Ensure prop names match
        toggleModal={() => setShowForgotModal(false)} // Close modal when triggered
      />

      <div className="landing-footer-wrapper">
        <footer className="landing-footer">
          <p>© 2025 Expense Pro. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
