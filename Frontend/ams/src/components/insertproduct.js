import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/insertproduct.css";
import insertProduct from "./css/insertproduct.jpg";

export default function InsertProductForm() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    p_name: "",
    p_description: "",
    p_price: "",
    p_img: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3003/api/insertproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to insert product. Status: ${response.status}`);
      }

      console.log("Product inserted successfully");
      navigate("/admin/productdetails");
    } catch (error) {
      console.error("Error inserting product:", error.message);
    }
  };

  return (
    <div className="insert-product-container">
      <div className="product-image-insert">
        <img
          src={insertProduct}
          alt="Insert Product"
          className="insert-product"
        />
      </div>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="p_name">Product Name:</label>
          <input
            type="text"
            id="p_name"
            name="p_name"
            value={productData.p_name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="p_description">Description:</label>
          <textarea
            id="p_description"
            name="p_description"
            value={productData.p_description}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="p_price">Price:</label>
          <input
            type="number"
            id="p_price"
            name="p_price"
            value={productData.p_price}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="p_img">Image URL:</label>
          <input
            type="text"
            id="p_img"
            name="p_img"
            value={productData.p_img}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="submit-button">
          Insert
        </button>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </form>
    </div>
  );
}
