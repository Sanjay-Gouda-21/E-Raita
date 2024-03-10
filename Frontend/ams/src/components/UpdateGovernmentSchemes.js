import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/update-g.css";

export default function UpdateScheme() {
  const navigate = useNavigate();
  const { schemeId } = useParams();

  const [formData, setFormData] = useState({
    Scheme_title: "",
    Scheme_desc: "",
    start_date: "",
    end_date: "",
    image_url: "",
    apply_link: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3003/updatescheme/${schemeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update scheme. Status: ${response.status}`);
      }

      navigate("/admin/governmentschemes");
    } catch (error) {
      console.error("Error updating scheme:", error.message);
    }
  };

  useEffect(() => {
    const fetchSchemeData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3003/govtscheme/${schemeId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch scheme data. Status: ${response.status}`
          );
        }

        const data = await response.json();

        const startDate = new Date(data.start_date);
        const endDate = new Date(data.end_date);

        const oneDayMilliseconds = 24 * 60 * 60 * 1000;

        startDate.setTime(startDate.getTime() + oneDayMilliseconds);
        endDate.setTime(endDate.getTime() + oneDayMilliseconds);

        const formattedStartDate = startDate.toISOString().split("T")[0];
        const formattedEndDate = endDate.toISOString().split("T")[0];

        setFormData({
          Scheme_title: data.Scheme_title,
          Scheme_desc: data.Scheme_desc,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          image_url: data.image_url,
          apply_link: data.apply_link,
        });
      } catch (error) {
        console.error("Error fetching scheme data:", error.message);
      }
    };

    fetchSchemeData();
  }, [schemeId]);

  return (
    <div className="update-scheme-container">
      <div className="update-scheme-form">
        <h1 className="h1">Update Scheme</h1>
        <form>
          <label className="lb">
            Scheme Title:
            <input
              type="text"
              name="Scheme_title"
              value={formData.Scheme_title}
              onChange={handleInputChange}
              className="txt1"
            />
          </label>
          <label className="lb">
            Description:
            <textarea
              name="Scheme_desc"
              value={formData.Scheme_desc}
              onChange={handleInputChange}
              className="txt1d"
            />
          </label>
          <label className="lb">
            Start Date:
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              className="txt1"
            />
          </label>
          <label className="lb">
            End Date:
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
              className="txt1"
            />
          </label>
          <label className="lb">
            Image URL:
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              className="txt1i"
            />
          </label>
        </form>
      </div>
      <div className="right-side-image1">
        <img
          src="/update.png"
          alt="Placeholder"
          className="image-placeholder"
        />
        <button type="submit" className="sb1" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
}
