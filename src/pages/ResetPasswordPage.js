import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";  // Import axios
import "../styles/ResetPasswordPage.css"; // Updated styles

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state

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

    setLoading(true);  // Start loading

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        { token, newPassword: password }
      );

      if (response.status === 200) {
        setMessage("Password reset successful! You can now log in with your new password.");
      } else {
        setGeneralError(response.data || "Failed to reset password.");
      }
    } catch (err) {
      setGeneralError("Something went wrong. Please try again.");
      console.error("Error resetting password:", err);
    } finally {
      setLoading(false);  // End loading
    }
  };

  return (
    <div className="reset-password-page">
      <h2>Reset Password</h2>
      {message ? (
        <p className="success">{message}</p>
      ) : (
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
              <p className="forgot-password-error-message">{confirmPasswordError}</p>
            )}
          </div>

          {generalError && (
            <p className="forgot-password-error-message">{generalError}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage;
