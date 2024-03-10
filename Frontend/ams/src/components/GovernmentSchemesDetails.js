import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/updatescheme.css";

export default function GovernmentSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3003/api/schemes");
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setSchemes(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleUpdateScheme = (scheme) => {
    navigate(`/updatescheme/${scheme.Scheme_id}`);
    console.log("Update scheme:", scheme);
  };

  const handleDeleteScheme = async (scheme) => {
    try {
      const response = await fetch(
        `http://localhost:3003/governmentschemes/${scheme.Scheme_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete scheme. Status: ${response.status}`);
      }

      const updatedSchemes = schemes.filter(
        (s) => s.Scheme_id !== scheme.Scheme_id
      );
      setSchemes(updatedSchemes);
    } catch (error) {
      console.error("Error deleting scheme:", error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="schemes-container">
      <button
        className="insert-scheme-button"
        onClick={() => navigate("/insertscheme")}
      >
        Insert Scheme
      </button>
      <p>Total Schemes: {schemes.length}</p>
      <table className="schemes-table">
        <thead>
          <tr>
            <th>Scheme Title</th>
            <th>Description</th>
            <th>Application Period</th>
            <th>Apply Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schemes.map((scheme) => (
            <tr key={scheme.Scheme_id} className="scheme-item">
              <td>{scheme.Scheme_title}</td>
              <td className="description-column">{scheme.Scheme_desc}</td>
              <td>{scheme.formatted_date_range}</td>
              <td className="apply-link-column">{scheme.apply_link}</td>
              <td>
                <button
                  className="b1"
                  onClick={() => handleUpdateScheme(scheme)}
                >
                  Update
                </button>
                <button
                  className="b1"
                  onClick={() => handleDeleteScheme(scheme)}
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
