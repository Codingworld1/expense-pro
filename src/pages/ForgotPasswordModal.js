import React, { useState } from "react";
import "../styles/ForgotPasswordModal.css";

const ForgotPasswordModal = ({ showModal, toggleModal }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert("Password reset link has been sent to your email.");
      toggleModal(); // Close modal after submission
    } else {
      alert("Please enter your email address.");
    }
  };

  if (!showModal) return null; // Don't render if not visible

  return (
    <div className="forgot-password-modal-overlay" onClick={toggleModal}>
      <div
        className="forgot-password-modal-container"
        onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
      >
        <button className="forgot-password-modal-close-btn" onClick={toggleModal}>
          &times;
        </button>
        <h2 className="forgot-password-modal-title">Forgot Password</h2>
        <p className="forgot-password-modal-instruction">
          Please enter your registered email address below, and we will send you a password reset link.
        </p>
        <form className="forgot-password-modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              className="forgot-password-modal-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="forgot-password-modal-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
