import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./src/assets/vendor/nucleo/css/nucleo.css";
import "./src/assets/vendor/font-awesome/css/font-awesome.min.css";
import "./src/assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "./index.js";
import Landing from "./pages/Landing.js";
import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js";
import Register from "./pages/Register.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Index />} />
      <Route path="/landing" exact element={<Landing />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);