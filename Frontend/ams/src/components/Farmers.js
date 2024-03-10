import React, { useState, useEffect } from "react";
import "./css/farmers.css";
import { useNavigate } from "react-router-dom";

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3003/farmerdetails");
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setFarmers(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error.message);
    }
  };

  const handleUpdateFarmer = (farmer) => {
    navigate(`/updatefarmer/${farmer.farmer_id}`);
    console.log("Update farmer:", farmer);
  };

  const handleDeleteFarmer = async (farmer) => {
    try {
      const response = await fetch(
        `http://localhost:3003/farmerdetails/${farmer.farmer_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete farmer. Status: ${response.status}`);
      }

      const updatedFarmers = farmers.filter(
        (f) => f.farmer_id !== farmer.farmer_id
      );
      setFarmers(updatedFarmers);
    } catch (error) {
      console.error("Error deleting farmer:", error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="farmers-container">
      <p className="farmer-p">Total Farmers: {farmers.length}</p>
      <table className="farmers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer) => (
            <tr key={farmer.farmer_id} className="farmer-item">
              <td>{farmer.f_name}</td>
              <td>{farmer.f_contact}</td>
              <td>{farmer.f_address}</td>
              <td>{farmer.f_email}</td>
              <td>
                <button
                  onClick={() => handleUpdateFarmer(farmer)}
                  className="f-btn"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteFarmer(farmer)}
                  className="f-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
