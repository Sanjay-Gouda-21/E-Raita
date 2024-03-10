import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Auth.css";

export default function AuthForm({ isSignIn }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wage, setWage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      contact,
      address,
      userType,
      email,
      password,
      wage,
    };

    try {
      const endpoint = isSignIn ? "signin" : "signup";

      const response = await fetch(`http://localhost:3003/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isSignIn) {
          if (userType === "admin") {
            navigate("/admin"); // Navigate to the admin page
          } else {
            console.log("Sign in successful");
            setSuccessMessage("Sign in successful!");
            setTimeout(() => setSuccessMessage(""), 1000);
            navigate("/MyAccount", {
              state: { email, password, userType },
            });
          }
        } else {
          console.log("Registration successful");
          setSuccessMessage("Registration successful!");

          setName("");
          setContact("");
          setAddress("");
          setUserType("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setWage("");
          setTimeout(() => {
            setSuccessMessage("");
          }, 5000);
        }
      } else {
        console.error(
          isSignIn ? "Sign in failed:" : "Registration failed:",
          data.error
        );

        setErrorMessage("Check Your Credentials");
        setTimeout(() => setErrorMessage(""), 1000);
      }
    } catch (error) {
      console.error(
        isSignIn ? "Error during sign in:" : "Error during registration:",
        error
      );

      setErrorMessage("An error occurred during the request.");
    }
  };

  const handlereset = () => {
    setName("");
    setContact("");
    setAddress("");
    setUserType("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setWage("");
  };

  return (
    <div className="auth-form landscape">
      <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        {!isSignIn && (
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter Full Name"
              className="ip"
            />
          </div>
        )}
        {!isSignIn && (
          <div>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              placeholder="Enter Contact Number"
              className="ip"
            />
          </div>
        )}
        {!isSignIn && (
          <>
            <div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Enter Full Address"
                className="ip"
              />
            </div>
          </>
        )}

        <div>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
            id="select"
          >
            <option value="">Select User Type</option>
            <option value="farmer">Farmer</option>
            <option value="customer">Customer</option>
            {isSignIn && <option value="admin">Admin</option>}
            <option value="labour">Labour</option>
          </select>
        </div>

        {!isSignIn && userType === "labour" && (
          <div>
            <input
              type="text"
              value={wage}
              onChange={(e) => setWage(e.target.value)}
              required
              placeholder="Enter Wage"
              className="ip"
            />
          </div>
        )}
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Your EmailId"
            className="ip"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter Password"
            className="ip"
          />
        </div>
        {!isSignIn && (
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
              className="ip"
            />
          </div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="button-container">
          <button className="btn5">{isSignIn ? "Sign In" : "Sign Up"}</button>
          <button className="btn6" onClick={handlereset}>
            Reset
          </button>
        </div>
      </form>
      {isSignIn ? (
        <p className="lp">
          Don't have an account?{" "}
          <Link to="/signup" className="link1">
            Sign Up
          </Link>
        </p>
      ) : (
        <p className="lp">
          Already have an account?{" "}
          <Link to="/signin" className="link1">
            Sign In
          </Link>
        </p>
      )}
      {isSignIn && (
        <p className="lp">
          <Link to="/forgotpass" className="link1">
            Forgot Password
          </Link>
        </p>
      )}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
}
