import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import menu from "../../assets/Pictures/icon-menu.svg";
import logo from "../../assets/Pictures/logo.svg";
import avatar from "../../assets/Pictures/image-avatar.png";
import MobileLinksDrawer from "../clientCarDetails/MobileLinksDrawer";
import "../../style/nav.css"; // Import CSS for styling

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown menu
  const navigate = useNavigate(); // Hook for navigation

  // Retrieve user data from localStorage to check login status
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsLoggedIn(true);
      
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleOpen = (val) => {
    setOpen(val);
  };

  const handleLogin = () => {
    // Redirect to login page
    navigate("/login");
  };

  const handleLogout = () => {
    // Clear user data from localStorage and set isLoggedIn to false
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', false);
    navigate("/login");
    window.location.reload();
  };

  const handleNavClick = (path) => {
    // Handle navigation
    navigate(path);
  };

  return (
    <header>
      <nav>
        <section className="left">
          <div className="imgs">
            <img
              className="hide-in-desktop"
              src={menu}
              alt="icon-menu"
              onClick={() => {
                handleOpen(true);
              }}
            />
            <MobileLinksDrawer onHandleOpen={handleOpen} onOpen={open} />
            <img src={logo} alt="logo" />
          </div>
          <div className="links hide-in-mobile">
            <ul>
              <li>
                <button onClick={() => handleNavClick("/home")}>Home</button>
              </li>
              <li>
                <button onClick={() => handleNavClick("/cars")}>Cars</button>
              </li>
              {/* Add more navigation links if needed */}
            </ul>
          </div>
        </section>
        <div className="right">
          {isLoggedIn ? (
            <div className="avatar-container" onClick={() => setShowDropdown(!showDropdown)}>
              <img src={avatar} alt="img-avatar" className="avatar" />
              {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={() => handleNavClick("/profile")}>Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          )}
        </div>
      </nav>
      <style jsx>{`
        .avatar-container {
          position: relative;
          cursor: pointer;
        }
        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 100%;
          background-color: white;
          border: 1px solid #ddd;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }
        .dropdown-menu button {
          width: 100%;
          padding: 10px;
          background: none;
          border: gray;
          text-align: left;
          cursor: pointer;
          color: gray;
        }
        .dropdown-menu button:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
