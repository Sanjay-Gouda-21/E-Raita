import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/u-farmer.css";

export default function UpdateCustomer() {
  const navigate = useNavigate();
  const { customerId } = useParams();

  const [formData, setFormData] = useState({
    c_name: "",
    c_contact: "",
    c_address: "",
    c_email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = () => {
    navigate("/admin/customers");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3003/updatecustomer/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update customer. Status: ${response.status}`
        );
      }

      navigate("/admin/customers");
    } catch (error) {
      console.error("Error updating customer:", error.message);
    }
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3003/customerdetails/${customerId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch customer data. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setFormData({
          c_name: data.c_name,
          c_contact: data.c_contact,
          c_address: data.c_address,
          c_email: data.c_email,
        });
      } catch (error) {
        console.error("Error fetching customer data:", error.message);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  return (
    <div className="update-farmer-container">
      <div className="update-farmer-form">
        <h1>Update Customer</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="c_name"
              value={formData.c_name}
              onChange={handleInputChange}
              className="txt"
            />
          </label>
          <label>
            Contact:
            <input
              type="text"
              name="c_contact"
              value={formData.c_contact}
              onChange={handleInputChange}
              className="txt"
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="c_address"
              value={formData.c_address}
              onChange={handleInputChange}
              className="txt"
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="c_email"
              value={formData.c_email}
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
