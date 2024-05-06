import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client'; // Import for React 18 rendering
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import AdminDash from "./pages/AdminDash";
import ManagerDash from "./pages/ManagerDash";
import Navbar from "./components/Navbar";
import Registration from "./pages/Registration";

const App = () => (
  <BrowserRouter>
        <Navbar />

    <Routes>
      <Route path= "/register" element={<Registration />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/admin" element={<AdminDash />} />
      <Route path="/manager" element={<ManagerDash />} />
    </Routes>
  </BrowserRouter>
);

const container = document.getElementById('root');
const root = createRoot(container); // Create root element for React 18
root.render(<App />); // Render the App component using createRoot

export default App;
