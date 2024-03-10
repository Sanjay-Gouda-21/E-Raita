import React, { useState, useEffect } from "react";
import "./css/customers.css";
import { useNavigate } from "react-router-dom";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3003/customerdetails");
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();

      setCustomers(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error.message);
    }
  };

  const handleUpdateCustomer = (customer) => {
    navigate(`/updatecustomer/${customer.cust_id}`);
  };

  const handleDeleteCustomer = async (customer) => {
    try {
      const response = await fetch(
        `http://localhost:3003/customerdetails/${customer.cust_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete customer. Status: ${response.status}`
        );
      }

      const updatedCustomers = customers.filter(
        (c) => c.cust_id !== customer.cust_id
      );
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error("Error deleting customer:", error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="customers-container">
      <p className="farmer-p">Total Customers: {customers.length}</p>
      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.cust_id} className="customer-item">
              <td>{customer.c_name}</td>
              <td>{customer.c_contact}</td>
              <td>{customer.c_address}</td>
              <td>{customer.c_email}</td>
              <td>
                <button
                  className="btn8"
                  onClick={() => handleUpdateCustomer(customer)}
                >
                  Update
                </button>
                <button
                  className="btn8"
                  onClick={() => handleDeleteCustomer(customer)}
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
