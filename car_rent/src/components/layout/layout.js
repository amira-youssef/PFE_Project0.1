import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout= () => {
  return (
    
      <>
      <Navbar />
      <div style={{ margin: '0px'}}>
       <Outlet />
      </div>
      </>  
  );
};

export default Layout;

