import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ForgotPasswordModal.css";

const ForgotPasswordModal = ({ showModal, toggleModal }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state

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

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:8080/api/auth/forgot-password", {
        email: email.trim().toLowerCase(),
      });

      if (response.status === 200) {
        setSubmitted(true);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error submitting forgot password:", error);
      setErrorMessage("Failed to connect to the server.");
    } finally {
      setIsLoading(false); // Stop loading after the request
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
              <div className="form-group">
                {isLoading ? (
                  <div className="loading-spinner-container">
                    <div className="loading-spinner"></div>
                  </div>
                ) : (
                  <button type="submit" className="forgot-password-modal-submit-btn">
                    Submit
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
