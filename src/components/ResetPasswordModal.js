import React, { useState } from "react";
import axios from "axios";
import "../styles/ResetPasswordPage.css";

const ResetPasswordModal = ({ onClose, onBackToProfile }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setConfirmPasswordError("");
    setGeneralError("");

    let hasError = false;

    if (!password) {
      setPasswordError("Please enter a new password.");
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your new password.");
      hasError = true;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;
    }

    if (password && password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/auth/change-password",
        { newPassword: password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Password changed successfully.");
      } else {
        setGeneralError(response.data || "Failed to change password.");
      }
    } catch (err) {
      setGeneralError("Something went wrong. Please try again.");
      console.error("Error changing password:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content reset-password-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="back-arrow"
          onClick={onBackToProfile}
          role="button"
          tabIndex={0}
          aria-label="Back"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onBackToProfile();
          }}
        >
          ←
        </span>

        <h2>Change Password</h2>
        {message ? (
          <p className="success">{message}</p>
        ) : (
          <div className="centered-form">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="forgot-password-error-message">{passwordError}</p>
                )}
              </div>

              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPasswordError && (
                  <p className="forgot-password-error-message">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              {generalError && (
                <p className="forgot-password-error-message">{generalError}</p>
              )}

              <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Change Password"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordModal;
