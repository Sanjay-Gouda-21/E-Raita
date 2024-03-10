import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/u-farmer.css";

export default function UpdateLabour() {
  const navigate = useNavigate();
  const { labourId } = useParams();

  const [formData, setFormData] = useState({
    l_name: "",
    l_contact: "",
    l_address: "",
    l_email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3003/updateLabour/${labourId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update labour. Status: ${response.status}`);
      }

      navigate("/admin/labours");
    } catch (error) {
      console.error("Error updating labour:", error.message);
    }
  };

  useEffect(() => {
    const fetchLabourData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3003/labourdetails/${labourId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch labour data. Status: ${response.status}`
          );
        }

        const data = await response.json();

        setFormData({
          l_name: data.l_name,
          l_contact: data.l_contact,
          l_address: data.l_address,
          l_email: data.l_email,
        });
      } catch (error) {
        console.error("Error fetching labour data:", error.message);
      }
    };

    fetchLabourData();
  }, [labourId]);

  return (
    <div className="update-farmer-container">
      <div className="update-farmer-form">
        <h1>Update Labour</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="l_name"
              value={formData.l_name}
              onChange={handleInputChange}
              className="txt"
            />
          </label>
          <label>
            Contact:
            <input
              type="text"
              name="l_contact"
              value={formData.l_contact}
              onChange={handleInputChange}
              className="txt"
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="l_address"
              value={formData.l_address}
              onChange={handleInputChange}
              className="txt"
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="l_email"
              value={formData.l_email}
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
