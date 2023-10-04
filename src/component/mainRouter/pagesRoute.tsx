import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../homePage/homePage";

import LoginPage from "../loginPage/LoginPage";
import ForgottenPassword from "../forgottenPage/forgottenPws";
import SignUp from "../signUp/signUp";
import AdminDashBoard from "../dashBoard/admin/dashBoard";
import ClientDashBoard from "../dashBoard/client/dashBoard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PagesRoute: React.FC = () => (
  <Router>
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotten" element={<ForgottenPassword />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/client/dashboard" element={<ClientDashBoard />} />
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />

        {/* Add more routes/pages here */}
      </Routes>
      <ToastContainer />
    </div>
  </Router>
);

export default PagesRoute;
