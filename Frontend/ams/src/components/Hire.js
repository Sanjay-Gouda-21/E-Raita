import React, { useState, useEffect } from "react";
import "./css/hire.css";
import { useNavigate } from "react-router-dom";

export default function Hire() {
  const [labourData, setLabourData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3003/labourers?search=${searchQuery}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        setLabourData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [searchQuery]);

  const hireLabour = (labour) => {
    navigate(`/HireLabour/${labour.labour_id}`);
  };

  if (error) {
    return <div className="hire-container">Error: {error}</div>;
  }

  return (
    <div className="hire-container1">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setSearchQuery("")} className="s-btn">
          Clear
        </button>
      </div>
      <table className="labour-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Wage</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {labourData.map((labour, index) => (
            <tr key={index}>
              <td>{labour.l_name}</td>
              <td>{labour.l_contact}</td>
              <td>{labour.l_address}</td>
              <td>{labour.l_wage}</td>
              <td>{labour.l_email}</td>
              <td>
                <button onClick={() => hireLabour(labour)} className="s-btn">
                  Hire
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
