import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/purchase.css";
import purchase1 from "./css/purchase.png";

export default function Purchase() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [customerId, setCustomerId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const purchaseData = {
      cust_id: customerId,
      productId,
      purchase_date: new Date().toISOString().split("T")[0],
      quantity: quantity,
    };

    try {
      const response = await fetch("http://localhost:3003/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create purchase. Status: ${response.status}`
        );
      }

      const responseData = await response.json();
      const purchaseId = responseData.purchase_id;

      console.log("Purchase created successfully with ID:", purchaseId);

      navigate(`/payment/${purchaseId}`);
    } catch (error) {
      console.error("Error creating purchase:", error.message);
    }
  };

  return (
    <div className="purchase-container">
      <h2 className="h2-purchase">Purchase Here</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer ID:
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            placeholder="Enter Your ID"
          />
        </label>
        <label>
          Product ID :
          <input type="text" value={productId} readOnly />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <button type="submit">Purchase</button>
      </form>
      <div className="purchaseimage">
        {" "}
        <img className="purchase-image" src={purchase1} alt="purchase" />
      </div>
    </div>
  );
}
