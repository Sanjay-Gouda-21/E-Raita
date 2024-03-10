import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/paymentconfirm.css";

export default function PaymentConfirmation() {
  const navigate = useNavigate();

  const handlePurchaseMore = () => {
    navigate("/farmersmarket");
  };

  return (
    <div className="payment-confirmation-container">
      <h1>Payment Confirmation</h1>
      <p>Your payment was successful!</p>
      <button onClick={handlePurchaseMore} className="btn3">
        Purchase More
      </button>
    </div>
  );
}
