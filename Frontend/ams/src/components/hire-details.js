import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/hiretable.css";

export default function HireTable() {
  const [hireList, setHireList] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3003/api/hire?sort=${sortBy}`
        );
        console.log("Response status:", response);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch hire data. Status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("Fetched hire data:", data);
        setHireList(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching hire data:", error.message);
      }
    };

    fetchData();
  }, [sortBy]);

  const handleUpdateHire = (hire) => {
    navigate(`/updatehire/${hire.hire_id}`);
    console.log("Update hire:", hire);
  };

  const handleDeleteHire = async (hire) => {
    try {
      const response = await fetch(
        `http://localhost:3003/hire/${hire.hire_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete hire entry. Status: ${response.status}`
        );
      }

      const updatedHireList = hireList.filter(
        (h) => h.hire_id !== hire.hire_id
      );
      setHireList(updatedHireList);
    } catch (error) {
      console.error("Error deleting hire entry:", error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="hire-container">
      <div className="hire-filter">
        <p>Total Entries: {hireList.length}</p>
        <button onClick={() => setSortBy("date")} className="hire-btn1">
          Sort by Date
        </button>
        <button onClick={() => setSortBy("wage")} className="hire-btn1">
          Sort by Wage
        </button>
        <button onClick={() => setSortBy("daysWorked")} className="hire-btn1">
          Sort by Days Worked
        </button>
      </div>
      <table className="hire-table">
        <thead>
          <tr>
            <th>Hire ID</th>
            <th>Farmer ID</th>
            <th>Labour ID</th>
            <th>Hire Date</th>
            <th>Total Wage</th>
            <th>Days Worked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hireList.map((hire) => (
            <tr key={hire.hire_id} className="hire-item">
              <td>{hire.hire_id}</td>
              <td>{hire.farmer_id}</td>
              <td>{hire.labour_id}</td>
              <td>{hire.formatted_hire_date}</td>
              <td>{hire.total_wage}</td>
              <td>{hire.days_worked}</td>
              <td>
                <button
                  onClick={() => handleUpdateHire(hire)}
                  className="hire-btn1"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteHire(hire)}
                  className="hire-btn1"
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
