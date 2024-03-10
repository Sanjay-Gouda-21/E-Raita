import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/myaccount.css";
import myaccount from "./css/profile.png";
export default function MyAccount() {
  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const initialUser = storedUser || location.state || {};

  const [userProfile, setUserProfile] = useState(initialUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userType = userProfile ? userProfile.userType : null;

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("user");
    setUserProfile({});
    navigate("/signin");
  };

  const handleProfileUpdate = () => {
    if (userType === "farmer") {
      navigate(`/updatefarmer/${userProfile.id}`);
    } else if (userType === "customer") {
      navigate(`/updatecustomer/${userProfile.id}`);
    } else if (userType === "labour") {
      navigate(`/updatelabour/${userProfile.id}`);
    } else {
      alert("Invalid user type");
    }
  };

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3003/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userProfile.email,
          password: userProfile.password,
          userType,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("myaccount " + userData);

        setUserProfile(userData.user);

        localStorage.setItem("user", JSON.stringify(userData.user));
      } else {
        setError("Failed to fetch user details");
      }
    } catch (error) {
      setError("Error fetching user details: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userProfile.id) {
      fetchUserDetails();
    }
  }, []);

  return (
    <div className="my-account-container">
      <div className="myac-image">
        <img src={myaccount} alt="my account" />
      </div>
      <div className="profile-section">
        <h2>Profile Details</h2>
        {loading ? (
          <p>Loading user profile...</p>
        ) : error ? (
          <p>{error}</p>
        ) : userProfile.id ? (
          <>
            <p className="p-tag">
              Your ID: <span>{userProfile.id}</span>
            </p>
            <p className="p-tag">
              Name: <span>{userProfile.name}</span>
            </p>
            <p className="p-tag">
              Email:<span> {userProfile.email}</span>
            </p>
            <p className="p-tag">
              Contact: <span>{userProfile.contact}</span>
            </p>
            <p className="p-tag">
              Address:<span> {userProfile.address}</span>
            </p>

            {userType === "labour" && (
              <p className="p-tag">
                Wage:<span> {userProfile.wage}</span>
              </p>
            )}
          </>
        ) : null}
        <div className="update-section">
          <button className="update-button" onClick={handleProfileUpdate}>
            Update Profile
          </button>
        </div>
        <div className="logout-section">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
