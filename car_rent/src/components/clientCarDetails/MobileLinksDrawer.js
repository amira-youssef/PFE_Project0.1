import { Drawer, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "../Icons/CloseIcon";
import { Link } from "react-router-dom";

const MobileLinksDrawer = ({ onOpen, onHandleOpen }) => {
  return (
    <Drawer
      className="mobile-drawer hide-in-desktop"
      anchor="left"
      transitionDuration={400}
      open={onOpen}
      onClose={() => {
        onHandleOpen(false);
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "30px",
        height: "100vh",
      }}
    >
      <div className="draw" style={{ width: "65vw" }}>
        <section className="closing">
          <IconButton
            disableRipple
            onClick={() => {
              onHandleOpen(false);
            }}
          >
            <CloseIcon fillColor={"#68707d"} />
          </IconButton>
        </section>
        <section className="mobile-links">
          <ul>
            <li>
            <Link to='/agencies' >
              <button>Agencies</button>
            </Link>
            </li>
            <li>
            <Link to='/cars' >
              <button>Cars</button>
              </Link>
            </li>
            
            <li>
            <Link to='/about' >
              <button>About</button>
            </Link>
            </li>
            <li>
            <Link to='/contact' >    
              <button>Contact</button>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </Drawer>
  );
};

export default MobileLinksDrawer;