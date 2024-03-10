import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./css/hirelabour.css";

export default function HireLabour() {
  const { labourerId } = useParams();
  const [labourer, setLabourer] = useState(null);
  const [hireDate, setHireDate] = useState("");
  const [daysOfWork, setDaysOfWork] = useState(1);
  const [labourerWage, setLabourerWage] = useState(0);
  const [totalWage, setTotalWage] = useState(0);
  const [farmerId, setFarmerId] = useState(null);
  const [hireSuccess, setHireSuccess] = useState(false);

  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const initialUser = storedUser || location.state || {};
  const [userProfile, setUserProfile] = useState(initialUser);
  const userType = userProfile ? userProfile.userType : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3003/labourers/${labourerId}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch labourer's details. Status: ${response.status}`
          );
        }
        const data = await response.json();
        setLabourer(data.laborer);

        setLabourerWage(data.laborer.l_wage);
      } catch (error) {
        console.error("Error fetching labourer's details:", error.message);
      }
    };

    const fetchFarmerId = async () => {
      try {
        const response = await fetch("http://localhost:3003/signin", {
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
          console.log(userData);
          setUserProfile(userData.user);

          localStorage.setItem("user", JSON.stringify(userData.user));

          setFarmerId(userData.user?.id);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
    if (!userProfile.id) {
      fetchFarmerId();
    }
  }, [labourerId, userProfile, userType]);

  const handleHire = async () => {
    const calculatedTotalWage = labourerWage * daysOfWork;
    const farmerId = userProfile.id;
    try {
      const response = await fetch("http://localhost:3003/hire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          labourerId,
          hireDate,
          daysOfWork,
          farmerId,
          totalWage: calculatedTotalWage,
        }),
      });

      if (response.ok) {
        console.log("Hire successful!");
        setTotalWage(calculatedTotalWage);

        setHireSuccess(true);
      } else {
        console.error("Error hiring labourer.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="hire-c">
      {labourer && (
        <div>
          <p className="hire-p">
            <span>Labourer Name: </span>
            {labourer.l_name}
          </p>
          <p className="hire-p">
            <span>Email: </span>
            {labourer.l_email}
          </p>
          <p className="hire-p">
            <span>Farmer ID: </span>
            {userProfile.id}
          </p>
          <p className="hire-p">
            <span>Contact: </span>
            {labourer.l_contact}
          </p>
          <p className="hire-p">
            <span>Address: </span>
            {labourer.l_address}
          </p>
          <p className="hire-p">
            <span>Labourer </span>Wage: ${labourerWage}
          </p>
        </div>
      )}
      <label>
        Hire Date:
        <input
          type="date"
          value={hireDate}
          onChange={(e) => setHireDate(e.target.value)}
          className="date"
        />
      </label>
      <label>
        Number of Days of Work:
        <input
          type="number"
          value={daysOfWork}
          onChange={(e) => setDaysOfWork(Number(e.target.value))}
          className="num"
        />
      </label>

      <button onClick={handleHire} className="hire-btn">
        Hire
      </button>
      {hireSuccess && (
        <p className="success-message">
          Hire successful! Total Wage: ${totalWage.toFixed(2)}
        </p>
      )}
    </div>
  );
}
