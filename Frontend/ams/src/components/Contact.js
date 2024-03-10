import React, { useState } from "react";
import contactus from "./contactus.jpg";
import "./css/Contact.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    contactName: "",
    contactEmail: "",
    contactMessage: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.contactName ||
      !formData.contactEmail ||
      !formData.contactMessage
    ) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    setSuccessMessage("Message sent successfully.");
    setErrorMessage("");

    setFormData({
      contactName: "",
      contactEmail: "",
      contactMessage: "",
    });

    setTimeout(() => {
      setSuccessMessage("");
    }, 1000);
  };

  return (
    <div className="contact-us-container">
      <div className="contact-left-side-image">
        <img
          src={contactus}
          alt="Placeholder"
          className="contact-image-placeholder"
        />
      </div>
      <div className="contact-form">
        <h1 className="h1c">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <label className="contact-form-label">
            Name:
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              className="contact-txt"
            />
          </label>
          <label className="contact-form-label">
            Email:
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              className="contact-txt"
            />
          </label>
          <label className="contact-form-label">
            Message:
            <textarea
              name="contactMessage"
              value={formData.contactMessage}
              onChange={handleInputChange}
              className="contact-txt"
              rows="5"
            />
          </label>
          <button type="submit" className="contact-sb">
            Send Message
          </button>
        </form>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </div>
  );
}
