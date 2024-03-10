import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/u-farmer.css";
export default function UpdateHire() {
  const navigate = useNavigate();
  const { hireId } = useParams();

  const [formData, setFormData] = useState({
    farmer_id: "",
    labour_id: "",
    hire_date: "",
    total_wage: "",
    days_worked: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3003/updatehire/${hireId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update hire. Status: ${response.status}`);
      }

      navigate("/admin/hiretable");
    } catch (error) {
      console.error("Error updating hire:", error.message);
    }
  };

  useEffect(() => {
    const fetchHireData = async () => {
      try {
        const response = await fetch(`http://localhost:3003/hire/${hireId}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch hire data. Status: ${response.status}`
          );
        }

        const data = await response.json();

        const formattedHireDate = new Date(data.hire_date)
          .toISOString()
          .split("T")[0];

        setFormData({
          farmer_id: data.farmer_id,
          labour_id: data.labour_id,
          hire_date: formattedHireDate,
          total_wage: data.total_wage,
          days_worked: data.days_worked,
        });
      } catch (error) {
        console.error("Error fetching hire data:", error.message);
      }
    };

    fetchHireData();
  }, [hireId]);

  return (
    <div className="update-farmer-container">
      <div className="update-farmer-form">
        <h1>Update Hire</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Farmer ID:
            <input
              type="text"
              name="farmer_id"
              value={formData.farmer_id}
              className="txt"
              readOnly
            />
          </label>
          <label>
            Labour ID:
            <input
              type="text"
              name="labour_id"
              value={formData.labour_id}
              className="txt"
              readOnly
            />
          </label>
          <label>
            Hire Date:
            <input
              type="date"
              name="hire_date"
              value={formData.hire_date}
              onChange={handleInputChange}
              className="date-input"
            />
          </label>
          <label>
            Days Worked:
            <input
              type="text"
              name="days_worked"
              value={formData.days_worked}
              onChange={handleInputChange}
              className="txt"
            />
          </label>
          <label>
            Total Wage:
            <input
              type="text"
              name="total_wage"
              value={formData.total_wage}
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
