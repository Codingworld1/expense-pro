import React, { useState, useEffect } from "react";
import "../styles/ForgotPasswordModal.css";

const ForgotPasswordModal = ({ showModal, toggleModal }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (showModal) {
      setEmail("");
      setSubmitted(false);
      setErrorMessage("");
    }
  }, [showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      if (response.ok) {
        setSubmitted(true);
        setErrorMessage("");
      } else if (response.status === 404) {
        setErrorMessage("This email is not registered with us.");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting forgot password:", error);
      setErrorMessage("Failed to connect to the server.");
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
              Please enter your registered email address
            </p>
            <form className="forgot-password-modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  className="forgot-password-modal-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errorMessage && (
                <p className="forgot-password-error-message">{errorMessage}</p>
              )}
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
