import React, { useState, useEffect } from "react";
import "./css/labour.css";
import { useNavigate } from "react-router-dom";

export default function Labours() {
  const [labours, setLabours] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3003/labourdetails");
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setLabours(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error.message);
    }
  };

  const handleUpdateLabour = (labour) => {
    navigate(`/updatelabour/${labour.labour_id}`);
    console.log("Update labour:", labour);
  };

  const handleDeleteLabour = async (labour) => {
    try {
      const response = await fetch(
        `http://localhost:3003/labourdetails/${labour.labour_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete labour. Status: ${response.status}`);
      }

      const updatedLabours = labours.filter(
        (l) => l.labour_id !== labour.labour_id
      );
      setLabours(updatedLabours);
    } catch (error) {
      console.error("Error deleting labour:", error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="labours-container">
      <p className="farmer-p">Total Labours: {labours.length}</p>
      <table className="labours-table">
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
          {labours.map((labour) => (
            <tr key={labour.labour_id}>
              <td>{labour.l_name}</td>
              <td>{labour.l_contact}</td>
              <td>{labour.l_address}</td>
              <td>{labour.l_email}</td>
              <td>
                <button onClick={() => handleUpdateLabour(labour)}>
                  Update
                </button>
                <button onClick={() => handleDeleteLabour(labour)}>
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
