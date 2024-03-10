import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const response = await simulateEmailSending(email);

    if (response) {
      setIsEmailSent(true);
    }
  };

  const simulateEmailSending = async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="auth-form landscape">
      <h2>Forgot Password</h2>
      {isEmailSent ? (
        <p className="success-message">
          Instructions to reset your password have been sent to your email
          address.
        </p>
      ) : (
        <form onSubmit={handleForgotPassword}>
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="ip"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button className="btn9">Reset Email</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
