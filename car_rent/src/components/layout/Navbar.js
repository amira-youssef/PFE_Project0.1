import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import menu from "../../assets/Pictures/icon-menu.svg";
import logo from "../../assets/Pictures/logo.svg";
import avatar from "../../assets/Pictures/image-avatar.png";
import MobileLinksDrawer from "../clientCarDetails/MobileLinksDrawer";
import "../../style/nav.css"; // Import CSS for styling

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
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
            <div className="navbar-brand">
              <Link to="/">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaQ7HJNRI6T7SljDS6RptFDpXBPY3IOZwQyQ&s" 
                  alt="Brand Logo" 
                  className="navbar-logo"
                />
              </Link>
            </div>
          </div>
          <div className="links hide-in-mobile">
            <ul>
              <li>
                <button onClick={() => handleNavClick("/home")}>Home</button>
              </li>
              <li>
                <button onClick={() => handleNavClick("/cars")}>Cars</button>
              </li>
              <li>
                <button onClick={() => handleNavClick("/agencies")}>Agencies</button>
              </li>
              <li>
                <button onClick={() => handleNavClick("/contact")}>Contact Us</button>
              </li>
              <li>
                <button onClick={() => handleNavClick("/how-to")}>How to ?</button>
              </li>
              {/* Add more navigation links if needed */}
            </ul>
          </div>
        </section>
        <div className="right">
          {isLoggedIn ? (
            <div className="avatar-container">
              <Link to="/profile">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" 
                     alt="img-avatar" 
                     className="avatar" />
              </Link>
            </div>
          ) : (
            <Button variant="contained" color="primary" style={{'backgroundColor': '#ff4d30'}} onClick={handleLogin}>
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
      `}</style>
    </header>
  );
};

export default Navbar;
