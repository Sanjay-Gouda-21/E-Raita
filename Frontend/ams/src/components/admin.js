// Admin.js
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./css/admin.css";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin");
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <ul className="admin-menu">
          <li>
            <Link to="/admin/adminpage" className="admin-menu-item">
              DashBoard
            </Link>
          </li>
          <li>
            <Link to="/admin/totalwage" className="admin-menu-item">
              Report On Total Wage
            </Link>
          </li>
          <li>
            <Link to="/admin/topproduct" className="admin-menu-item">
              Top Selling
            </Link>
          </li>
          <li>
            <Link to="/admin/farmers" className="admin-menu-item">
              Farmers
            </Link>
          </li>
          <li>
            <Link to="/admin/customers" className="admin-menu-item">
              Customers
            </Link>
          </li>
          <li>
            <Link to="/admin/labours" className="admin-menu-item">
              Labours
            </Link>
          </li>
          <li>
            <Link to="/admin/governmentschemes" className="admin-menu-item">
              Govt Schemes
            </Link>
          </li>
          <li>
            <Link to="/admin/hiretable" className="admin-menu-item">
              Hire Details
            </Link>
          </li>
          <li>
            <Link to="/admin/productdetails" className="admin-menu-item">
              Product Details
            </Link>
          </li>
          <li id="log-out" onClick={handleLogout}>
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "#222222" }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
