import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <div className="auth-buttons">
          <h2 className="h1-home">Start Your Journey Here</h2>
          <Link to="/signin" className="auth-button">
            <button className="styled-button-1">Sign In</button>
          </Link>
          <Link to="/signup" className="auth-button">
            <button className="styled-button-2">Sign Up</button>
          </Link>
        </div>
      </div>
    </>
  );
}
