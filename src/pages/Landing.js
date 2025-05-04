import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Initial.css";
import cashbag from "../assets/cashbag.png";
import analytics from "../assets/analytics.png";
import target from "../assets/target.png";
import approval from "../assets/approval.png";
import ForgotPasswordModal from "./ForgotPasswordModal";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isEmployee, setIsEmployee] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    // Basic validation before sending request
    if (!email && !password) {
      setError("Please enter both email and password.");
      return;
    } else if (!email) {
      setError("Please enter your email.");
      return;
    } else if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", isEmployee ? "employee" : "manager");
        navigate(isEmployee ? "/employee/dashboard" : "/manager/dashboard");
      } else if (response.status === 401) {
        const result = await response.json();
        setError(result.message || "Invalid email or password");
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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
              />
            </div>
            <button type="submit" className="enter-btn" disabled={loading}>
              {loading ? "Logging In..." : "Enter"}
            </button>
            {error && <p className="error-message">{error}</p>}
            <span
              className="forgot-password"
              onClick={() => setShowForgotModal(true)}
              style={{ cursor: "pointer" }}
            >
              Forgot Password?
            </span>
          </form>
        </section>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        showModal={showForgotModal}
        toggleModal={() => setShowForgotModal(false)}
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
