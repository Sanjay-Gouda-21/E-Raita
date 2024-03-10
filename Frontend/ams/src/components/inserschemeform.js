import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/insertscheme.css";
import insertScheme from "./css/insertscheme.jpeg";

export default function InsertSchemeForm() {
  const navigate = useNavigate();
  const [schemeData, setSchemeData] = useState({
    Scheme_title: "",
    Scheme_desc: "",
    start_date: "",
    end_date: "",
    image_url: "",
    apply_link: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSchemeData({ ...schemeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3003/api/insertscheme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schemeData),
      });

      if (!response.ok) {
        throw new Error(`Failed to insert scheme. Status: ${response.status}`);
      }

      console.log("Scheme inserted successfully");
      navigate("/admin/governmentschemes");
    } catch (error) {
      console.error("Error inserting scheme:", error.message);
    }
  };

  return (
    <div className="main">
      <div className="scheme-image-insert">
        <img
          src={insertScheme}
          alt="Insert Product"
          className="insert-scheme"
        />
      </div>
      <form onSubmit={handleSubmit} className="scheme-form">
        <div className="input-field">
          <label>
            <input
              placeholder="Scheme Title"
              type="text"
              name="Scheme_title"
              value={schemeData.Scheme_title}
              onChange={handleInputChange}
              className="input-text"
            />
          </label>
        </div>
        <div className="input-field">
          <label>
            <textarea
              placeholder="Description"
              name="Scheme_desc"
              value={schemeData.Scheme_desc}
              onChange={handleInputChange}
              className="input-textarea"
            />
          </label>
        </div>
        <div className="input-field">
          <label>
            <span>Start Date:</span>
            <input
              placeholder="Start Date"
              type="date"
              name="start_date"
              value={schemeData.start_date}
              onChange={handleInputChange}
              className="input-date"
            />
          </label>
        </div>
        <div className="input-field">
          <label>
            <span>End Date:</span>
            <input
              placeholder="End Date"
              type="date"
              name="end_date"
              value={schemeData.end_date}
              onChange={handleInputChange}
              className="input-date"
            />
          </label>
        </div>
        <div className="input-field">
          <label>
            <input
              placeholder="Image URL"
              type="text"
              name="image_url"
              value={schemeData.image_url}
              onChange={handleInputChange}
              className="input-text"
            />
          </label>
        </div>
        <div className="input-field">
          <label>
            <input
              placeholder="Apply Link"
              type="text"
              name="apply_link"
              value={schemeData.apply_link}
              onChange={handleInputChange}
              className="input-text"
            />
          </label>
        </div>
        <button id="insert-button" type="submit">
          Insert
        </button>
      </form>
    </div>
  );
}
