import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/u-farmer.css";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [formData, setFormData] = useState({
    p_name: "",
    p_description: "",
    p_price: "",
    p_img: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3003/updateproduct/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update product. Status: ${response.status}`);
      }

      navigate("/admin/productdetails");
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3003/products/${productId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch product data. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setFormData({
          p_name: data.p_name,
          p_description: data.p_description,
          p_price: data.p_price,
          p_img: data.p_img,
        });
      } catch (error) {
        console.error("Error fetching product data:", error.message);
      }
    };

    fetchProductData();
  }, [productId]);

  return (
    <div className="update-farmer-container">
      <div className="update-farmer-form">
        <h1>Update Product</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input
              type="text"
              name="p_name"
              value={formData.p_name}
              onChange={handleInputChange}
              className="txt"
            />
          </label>
          <label>
            Description:
            <textarea
              name="p_description"
              value={formData.p_description}
              onChange={handleInputChange}
              className="desc"
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="p_price"
              value={formData.p_price}
              onChange={handleInputChange}
              className="txt"
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="p_img"
              value={formData.p_img}
              onChange={handleInputChange}
              className="txt"
            />
          </label>
          <button type="submit" className="sb">
            Update
          </button>
        </form>
      </div>
      <div className="right-side-image">
        <img
          src="/update.png"
          alt="Placeholder"
          className="image-placeholder"
        />
      </div>
    </div>
  );
}
