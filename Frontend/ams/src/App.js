// App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AgriNews from "./components/AgriNews";
import FarmersMarket from "./components/FarmersMarket";
import Hire from "./components/Hire";
import Contact from "./components/Contact";
import MyAccount from "./components/myaccount";
import AuthForm from "./components/AuthForm";
import Admin from "./components/admin";
import Farmers from "./components/Farmers";
import Customers from "./components/Customers";
import UpdateFarmer from "./components/updatefarmer";
import UpdateCustomer from "./components/updatecustomer";
import Labours from "./components/Labours";
import UpdateLabour from "./components/updatelabour";
import GovernmentSchemes from "./components/GovernmentSchemesDetails";
import InsertSchemeForm from "./components/inserschemeform";
import UpdateScheme from "./components/UpdateGovernmentSchemes";
import Hirelabour from "./components/HireLabour";
import HireTable from "./components/hire-details";
import UpdateHire from "./components/updatehire";
import Purchase from "./components/purchase";
import Payment from "./components/payment";
import PaymentConfirmation from "./components/paymentconfirm";
import ProductsDetails from "./components/productdetails";
import UpdateProduct from "./components/updateproducts";
import InsertProduct from "./components/insertproduct";
import AdminPage from "./components/AdminPage";
import TotalWagesChart from "./components/TotalWageChart";
import TopProductsChart from "./components/TopProductChart";
import ForgotPass from "./components/forgotpass";
import "./App.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div className="navtop">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/AgriNews" element={<AgriNews />} />
          <Route path="/FarmersMarket" element={<FarmersMarket />} />
          <Route path="/Hire" element={<Hire />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/updatefarmer/:farmerId" element={<UpdateFarmer />} />
          <Route
            path="/updatecustomer/:customerId"
            element={<UpdateCustomer />}
          />
          <Route path="/paymentconfirm" element={<PaymentConfirmation />} />

          <Route path="/updatelabour/:labourId" element={<UpdateLabour />} />
          <Route path="/insertscheme" element={<InsertSchemeForm />} />
          <Route path="/updatescheme/:schemeId" element={<UpdateScheme />} />
          <Route path="/HireLabour/:labourerId" element={<Hirelabour />} />
          <Route path="/updatehire/:hireId" element={<UpdateHire />} />
          <Route path="/purchase/:productId" element={<Purchase />} />
          <Route path="/payment/:purchaseId" element={<Payment />} />
          <Route path="/updateproduct/:productId" element={<UpdateProduct />} />
          <Route path="/insertproduct" element={<InsertProduct />} />
          <Route path="/totalwagechart" element={<TotalWagesChart />} />
          <Route path="/forgotpass" element={<ForgotPass />} />

          <Route
            path="/signin"
            element={<AuthForm isSignIn onAuthSuccess={handleAuthSuccess} />}
          />
          <Route
            path="/signup"
            element={<AuthForm onAuthSuccess={handleAuthSuccess} />}
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/MyAccount" />
              ) : (
                <Navigate to="/Home" />
              )
            }
          />
        </Routes>
      </div>

      <div className="admin-nav">
        <Routes>
          <Route path="/MyAccount" element={<MyAccount />}>
            <Route
              path="/MyAccount/updatefarmer/:farmerId"
              element={<UpdateFarmer />}
            />
            <Route
              path="/MyAccount/updatecustomer/:customerId"
              element={<UpdateCustomer />}
            />

            <Route
              path="/MyAccount/updatelabour/:labourId"
              element={<UpdateLabour />}
            />
            <Route
              path="/MyAccount/updatehire/:hireId"
              element={<UpdateHire />}
            />
          </Route>
        </Routes>
      </div>
      <div className="my-account">
        <Routes>
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/adminpage" element={<AdminPage />} />
            <Route path="/admin/totalwage" element={<TotalWagesChart />} />
            <Route path="/admin/topproduct" element={<TopProductsChart />} />
            <Route path="/admin/farmers" element={<Farmers />} />{" "}
            <Route path="/admin/customers" element={<Customers />} />{" "}
            <Route path="/admin/labours" element={<Labours />} />
            <Route
              path="/admin/governmentschemes"
              element={<GovernmentSchemes />}
            />
            <Route path="/admin/hiretable" element={<HireTable />} />
            <Route path="/admin/productdetails" element={<ProductsDetails />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
