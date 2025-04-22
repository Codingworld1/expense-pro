import React, { useState, useEffect } from "react";
import "../styles/ForgotPasswordModal.css";

const ForgotPasswordModal = ({ showModal, toggleModal }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (showModal) {
      setEmail("");
      setSubmitted(false);
    }
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  if (!showModal) return null;

  return (
    <div className="forgot-password-modal-overlay" onClick={toggleModal}>
      <div
        className="forgot-password-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="forgot-password-modal-close-btn"
          onClick={toggleModal}
        >
          &times;
        </button>

        <h2 className="forgot-password-modal-title">Forgot Password</h2>

        {submitted ? (
          <p className="forgot-password-confirmation">
            A password reset link has been sent to <strong>{email}</strong>.
            Please check your inbox.
          </p>
        ) : (
          <>
            <p className="forgot-password-modal-instruction">
              Please enter your registered email address below, and we will send
              you a password reset link.
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
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
