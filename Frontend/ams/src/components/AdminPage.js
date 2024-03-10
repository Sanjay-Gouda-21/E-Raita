import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/AdminPage.css";

const AdminPage = () => {
  const [farmersCount, setFarmersCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [laboursCount, setLaboursCount] = useState(0);
  const [schemesCount, setSchemesCount] = useState(0);
  const [hireCount, setHireCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataCount = async () => {
      try {
        const farmersResponse = await fetch(
          "http://localhost:3003/farmerdetails"
        );
        if (!farmersResponse.ok) {
          throw new Error(
            `Failed to fetch farmers data. Status: ${farmersResponse.status}`
          );
        }
        const farmersData = await farmersResponse.json();
        setFarmersCount(farmersData.length);

        const customersResponse = await fetch(
          "http://localhost:3003/customerdetails"
        );
        if (!customersResponse.ok) {
          throw new Error(
            `Failed to fetch customers data. Status: ${customersResponse.status}`
          );
        }
        const customersData = await customersResponse.json();
        setCustomersCount(customersData.length);

        const laboursResponse = await fetch(
          "http://localhost:3003/labourdetails"
        );
        if (!laboursResponse.ok) {
          throw new Error(
            `Failed to fetch labours data. Status: ${laboursResponse.status}`
          );
        }
        const laboursData = await laboursResponse.json();
        setLaboursCount(laboursData.length);

        const schemesResponse = await fetch(
          "http://localhost:3003/api/schemes"
        );
        if (!schemesResponse.ok) {
          throw new Error(
            `Failed to fetch schemes data. Status: ${schemesResponse.status}`
          );
        }
        const schemesData = await schemesResponse.json();
        setSchemesCount(schemesData.length);

        const hireResponse = await fetch("http://localhost:3003/api/hire");
        if (!hireResponse.ok) {
          throw new Error(
            `Failed to fetch hire data. Status: ${hireResponse.status}`
          );
        }
        const hireData = await hireResponse.json();
        setHireCount(hireData.length);

        const productsResponse = await fetch("http://localhost:3003/products");
        if (!productsResponse.ok) {
          throw new Error(
            `Failed to fetch products data. Status: ${productsResponse.status}`
          );
        }
        const productsData = await productsResponse.json();
        setProductsCount(productsData.length);
      } catch (error) {
        console.error("Error fetching data count:", error.message);
      }
    };

    fetchDataCount();
  }, []);

  return (
    <div className="admin-containe">
      <div id="farmers" className="admin-button">
        <button
          className="btna"
          onClick={() => {
            navigate("/admin/farmers");
          }}
        >
          <p> Farmers </p> <span>{farmersCount}</span>
        </button>
      </div>
      <div id="customers" className="admin-button">
        <button
          className="btna"
          onClick={() => {
            navigate("/admin/customers");
          }}
        >
          <p>Customers </p> <span>{customersCount}</span>
        </button>
      </div>
      <div id="labours" className="admin-button">
        <button
          className="btna"
          onClick={() => {
            navigate("/admin/labours");
          }}
        >
          <p>Labours</p> <span>{laboursCount}</span>
        </button>
      </div>
      <div id="schemes" className="admin-button">
        <button
          onClick={() => {
            navigate("/admin/governmentschemes");
          }}
          className="btna"
        >
          <p>Schemes </p>
          <span> {schemesCount}</span>
        </button>
      </div>
      <div id="hire" className="admin-button">
        <button
          className="btna"
          onClick={() => {
            navigate("/admin/hiretable");
          }}
        >
          <p> Hired </p> <span>{hireCount}</span>
        </button>
      </div>
      <div id="products" className="admin-button">
        <button
          className="btna"
          onClick={() => {
            navigate("/admin/productdetails");
          }}
        >
          <p>Products</p> <span>{productsCount}</span>
        </button>
      </div>
    </div>
  );
};
export default AdminPage;
