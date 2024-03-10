import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/u-farmer.css";

export default function UpdateFarmer() {
  const navigate = useNavigate();
  const { farmerId } = useParams();

  const [formData, setFormData] = useState({
    f_name: "",
    f_contact: "",
    f_address: "",
    f_email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3003/updateFarmer/${farmerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update farmer. Status: ${response.status}`);
      }

      navigate("/admin/farmers");
    } catch (error) {
      console.error("Error updating farmer:", error.message);
    }
  };

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3003/farmerdetails/${farmerId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch farmer data. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setFormData({
          f_name: data.f_name,
          f_contact: data.f_contact,
          f_address: data.f_address,
          f_email: data.f_email,
        });
      } catch (error) {
        console.error("Error fetching farmer data:", error.message);
      }
    };

    fetchFarmerData();
  }, [farmerId]);

  return (
    <div className="update-farmer-container">
      <div className="update-farmer-form">
        <h1>Update Farmer</h1>
        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Name:
            <input
              type="text"
              name="f_name"
              value={formData.f_name}
              onChange={handleInputChange}
              className="txt"
            />
          </label>
          <label className="form-label">
            Contact:
            <input
              type="text"
              name="f_contact"
              value={formData.f_contact}
              onChange={handleInputChange}
              className="txt"
            />
          </label>
          <label className="form-label">
            Address:
            <input
              type="text"
              name="f_address"
              value={formData.f_address}
              onChange={handleInputChange}
              className="txt"
            />
          </label>
          <label className="form-label">
            Email:
            <input
              type="text"
              name="f_email"
              value={formData.f_email}
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
